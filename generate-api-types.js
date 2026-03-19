import { generateApi } from 'swagger-typescript-api';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取环境变量
const envPath = path.resolve(__dirname, '../.env.development');
const envConfig = fs.existsSync(envPath) 
  ? dotenv.parse(fs.readFileSync(envPath, 'utf8')) 
  : {};
const SWAGGER_BASE_URL = (envConfig.VITE_SWAGGER_ADDRESS || 'http://localhost:3000/api-docs/').trim();

console.log(`Swagger地址: ${SWAGGER_BASE_URL}`);

const modules = ['file', 'home'];
const typesDir = path.resolve(__dirname, '../src/types');
const apisDir = path.resolve(__dirname, '../src/apis');

// 确保目录存在
if (!fs.existsSync(typesDir)) fs.mkdirSync(typesDir, { recursive: true });
if (!fs.existsSync(apisDir)) fs.mkdirSync(apisDir, { recursive: true });

/**
 * 从内联返回类型字符串中提取 data 字段的类型
 * @param {string} returnTypeStr 例如 "{ code: number; message: string; data: null; }"
 * @returns {string|null} 提取到的类型字符串，如 "null"、"{ id: number }" 等
 */
function extractDataType(returnTypeStr) {
  const dataFieldRegex = /data\??\s*:\s*/;
  const match = dataFieldRegex.exec(returnTypeStr);
  if (!match) return null;

  const startIdx = match.index + match[0].length;
  let depth = 0; // 花括号和方括号的嵌套深度
  let inString = false;
  let stringChar = '';
  let endIdx = returnTypeStr.length;

  for (let i = startIdx; i < returnTypeStr.length; i++) {
    const ch = returnTypeStr[i];
    // 处理字符串字面量（跳过引号内的内容）
    if ((ch === '"' || ch === "'" || ch === '`') && returnTypeStr[i - 1] !== '\\') {
      if (!inString) {
        inString = true;
        stringChar = ch;
      } else if (ch === stringChar) {
        inString = false;
      }
      continue;
    }
    if (inString) continue;

    // 更新深度
    if (ch === '{' || ch === '[') depth++;
    else if (ch === '}' || ch === ']') depth--;

    // 如果深度变为负数，说明遇到了外层的闭合括号，停止且不包含此括号
    if (depth < 0) {
      endIdx = i;
      break;
    }

    // 深度为0时遇到逗号，停止且不包含逗号
    if (depth === 0 && ch === ',') {
      endIdx = i;
      break;
    }
  }

  return returnTypeStr.substring(startIdx, endIdx).trim();
}

/**
 * 解析函数参数列表字符串，返回参数对象数组
 * @param {string} paramsStr 例如 "id: number, data: { name: string }"
 * @returns {Array<{ name: string, type: string, optional: boolean }>}
 */
function parseParameters(paramsStr) {
  if (!paramsStr.trim()) return [];
  const params = [];
  let current = '';
  let depth = 0; // 括号深度
  let inString = false;
  let stringChar = '';

  for (let i = 0; i < paramsStr.length; i++) {
    const ch = paramsStr[i];
    if ((ch === '"' || ch === "'" || ch === '`') && paramsStr[i - 1] !== '\\') {
      if (!inString) {
        inString = true;
        stringChar = ch;
      } else if (ch === stringChar) {
        inString = false;
      }
      current += ch;
      continue;
    }
    if (inString) {
      current += ch;
      continue;
    }

    if (ch === '{' || ch === '[') depth++;
    else if (ch === '}' || ch === ']') depth--;

    if (ch === ',' && depth === 0) {
      const param = current.trim();
      if (param) {
        const colonIdx = param.indexOf(':');
        if (colonIdx > -1) {
          const namePart = param.substring(0, colonIdx).trim();
          const typePart = param.substring(colonIdx + 1).trim();
          const optional = namePart.endsWith('?');
          const name = optional ? namePart.slice(0, -1) : namePart;
          params.push({ name, type: typePart, optional });
        }
      }
      current = '';
    } else {
      current += ch;
    }
  }
  if (current.trim()) {
    const param = current.trim();
    const colonIdx = param.indexOf(':');
    if (colonIdx > -1) {
      const namePart = param.substring(0, colonIdx).trim();
      const typePart = param.substring(colonIdx + 1).trim();
      const optional = namePart.endsWith('?');
      const name = optional ? namePart.slice(0, -1) : namePart;
      params.push({ name, type: typePart, optional });
    }
  }
  return params;
}

async function generateApiFiles() {
  for (const module of modules) {
    try {
      const swaggerUrl = `${SWAGGER_BASE_URL}${module}.json`;
      console.log(`\n开始生成 ${module} 模块 API...`);
      console.log(`Swagger文档地址: ${swaggerUrl}`);

      const tempDir = path.resolve(__dirname, '../temp');
      if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true, force: true });
      fs.mkdirSync(tempDir, { recursive: true });

      await generateApi({
        name: `${module}.ts`,
        url: swaggerUrl,
        output: tempDir,
        httpClientType: 'axios',
        modular: true,
        generateResponses: true,
        extractRequestParams: true,
        unwrapResponseData: true,
        generateRouteTypes: false,
        generateClient: true,
        silent: true
      });

      if (fs.existsSync(tempDir)) {
        const files = fs.readdirSync(tempDir);

        // 1. 处理 data-contracts.ts 中的业务类型
        const dataContractsPath = path.join(tempDir, 'data-contracts.ts');
        let typeDefinitions = '';
        if (fs.existsSync(dataContractsPath)) {
          typeDefinitions = fs.readFileSync(dataContractsPath, 'utf8');
        }

        let cleanedTypes = typeDefinitions
          .replace(/import.*from.*['"].*['"];?\n?/g, '')
          .replace(/export\s+{\s*.*\s*};?\n?/g, '')
          .replace(/\/\*[\s\S]*?\*\/\s*/g, '')
          .replace(/\/\/.*\n/g, '')
          .trim();

        const typeMatches = cleanedTypes.match(/export\s+(interface|type|enum)\s+\w+[\s\S]*?}(?=\s*(export|$))/g) || [];
        const businessTypes = typeMatches.filter(def => 
          !def.includes('Axios') && 
          !def.includes('HttpClient') && 
          !def.includes('QueryParamsType') &&
          !def.includes('FullRequestParams') &&
          !def.includes('RequestParams') &&
          !def.includes('ApiConfig') &&
          !def.includes('ContentType')
        );

        // 2. 收集类型导入和生成的自定义别名
        const importsMap = new Map(); // key: 模块路径, value: Set<类型名>
        const methodResponses = [];   // 存储方法信息
        const generatedAliases = new Map(); // 返回类型别名，key: 别名定义字符串, value: 本身
        const paramsAliases = new Map();     // 参数类型别名，key: 别名定义字符串, value: 本身

        // 预填充 importsMap 中已存在的类型名（来自 data-contracts）
        const existingTypes = new Set();
        businessTypes.forEach(def => {
          const nameMatch = def.match(/export\s+(?:interface|type|enum)\s+(\w+)/);
          if (nameMatch) existingTypes.add(nameMatch[1]);
        });

        // 3. 遍历所有生成的模块文件
        for (const fileName of files) {
          if (fileName === 'data-contracts.ts' || fileName === 'http-client.ts') continue;
          if (!fileName.endsWith('.ts')) continue;

          const filePath = path.join(tempDir, fileName);
          const content = fs.readFileSync(filePath, 'utf8');

          // 3.1 收集从 data-contracts 导入的类型
          const importRegex = /import\s+{([^}]+)}\s+from\s+['"]\.\/data-contracts['"]/g;
          let match;
          while ((match = importRegex.exec(content)) !== null) {
            const typeNames = match[1].split(',').map(t => t.trim()).filter(t => t);
            const targetPath = `../types/${module}`;
            if (!importsMap.has(targetPath)) importsMap.set(targetPath, new Set());
            const typeSet = importsMap.get(targetPath);
            typeNames.forEach(typeName => {
              if (!typeName.includes('HttpClient') && !typeName.includes('RequestParams') && !typeName.includes('ContentType')) {
                typeSet.add(typeName);
                existingTypes.add(typeName);
              }
            });
          }

          // 3.2 提取方法定义
          const methodRegex = /(\w+)\s*=\s*\(([\s\S]*?)\)\s*=>\s*this\.request<([\s\S]+?)>\s*\(\{([\s\S]*?)\}\);?/g;
          let methodMatch;
          while ((methodMatch = methodRegex.exec(content)) !== null) {
            const functionName = methodMatch[1];
            const returnTypeWithError = methodMatch[3];
            const requestOptions = methodMatch[4];
            const paramsStr = methodMatch[2];

            // 处理返回类型
            let returnType = returnTypeWithError.split(',')[0].trim();
            returnType = returnType.replace(/\s+/g, ' ').trim();

            // 检查返回类型是否为内联对象（包含 data 字段）
            const isInlineObject = returnType.startsWith('{') && returnType.includes('data');
            let finalReturnType = returnType;

            if (isInlineObject) {
              const dataType = extractDataType(returnType);
              if (dataType !== null) {
                // 生成别名：函数名 + Data（首字母大写）
                const aliasName = functionName.charAt(0).toUpperCase() + functionName.slice(1) + 'Data';
                finalReturnType = aliasName;

                // 生成类型别名定义
                const aliasDef = `export type ${aliasName} = ${dataType};`;
                if (!generatedAliases.has(aliasDef)) {
                  generatedAliases.set(aliasDef, aliasDef);
                }

                // 确保别名加入 importsMap
                const targetPath = `../types/${module}`;
                if (!importsMap.has(targetPath)) importsMap.set(targetPath, new Set());
                importsMap.get(targetPath).add(aliasName);
              }
            }

            // 处理参数类型
            const params = parseParameters(paramsStr);
            const processedParams = []; // 用于生成函数参数列表字符串

            for (const param of params) {
              const { name, type, optional } = param;
              // 跳过 params 参数（即 RequestParams 类型）
              if (name === 'params' && type.includes('RequestParams')) {
                continue;
              }
              // 判断类型是否为内联对象（以 { 开头）并且不在 existingTypes 中
              const isInlineType = type.startsWith('{') && !existingTypes.has(type);
              let finalType = type;

              if (isInlineType) {
                // 生成参数类型别名：函数名 + Params（首字母大写）
                const aliasName = functionName.charAt(0).toUpperCase() + functionName.slice(1) + 'Params';
                finalType = aliasName;

                // 生成类型别名定义
                const aliasDef = `export type ${aliasName} = ${type};`;
                if (!paramsAliases.has(aliasDef)) {
                  paramsAliases.set(aliasDef, aliasDef);
                }

                // 确保别名加入 importsMap
                const targetPath = `../types/${module}`;
                if (!importsMap.has(targetPath)) importsMap.set(targetPath, new Set());
                importsMap.get(targetPath).add(aliasName);
              }

              // 构建参数列表字符串
              const paramStr = optional ? `${name}?: ${finalType}` : `${name}: ${finalType}`;
              processedParams.push(paramStr);
            }

            const finalParamsStr = processedParams.join(', ');

            methodResponses.push({
              functionName,
              returnType: finalReturnType,
              requestOptions,
              params: finalParamsStr,
            });
          }
        }

        // 4. 写入类型文件 (.d.ts)
        const typeFilePath = path.join(typesDir, `${module}.d.ts`);
        let typeFileContent = businessTypes.join('\n\n');

        // 添加参数类型别名
        if (paramsAliases.size > 0) {
          typeFileContent += '\n\n' + Array.from(paramsAliases.values()).join('\n\n');
        }

        // 添加返回类型别名
        if (generatedAliases.size > 0) {
          typeFileContent += '\n\n' + Array.from(generatedAliases.values()).join('\n\n');
        }

        // 清理多余空行
        typeFileContent = typeFileContent.replace(/\n{3,}/g, '\n\n').trim();

        fs.writeFileSync(typeFilePath, typeFileContent, 'utf8');
        console.log(`✓ 类型文件已生成: ${typeFilePath}`);

        // 5. 生成 API 文件 (.ts)
        const apiFilePath = path.join(apisDir, `${module}.ts`);
        let apiContent = `import { request } from '../utils/request';\n`;

        // 添加类型导入（过滤掉 RequestParams 等）
        if (importsMap.size > 0) {
          for (const [modulePath, typeSet] of importsMap) {
            const filteredTypes = Array.from(typeSet).filter(t => !t.includes('RequestParams'));
            if (filteredTypes.length === 0) continue;
            const types = filteredTypes.join(', ');
            apiContent += `import type { ${types} } from "${modulePath}";\n`;
          }
        }
        apiContent += '\n';

        for (const method of methodResponses) {
          const { functionName, returnType, requestOptions, params } = method;

          // 提取路径
          const pathMatch = requestOptions.match(/path:\s*[`'"]([^`'"]+)[`'"]/);
          const apiPath = pathMatch ? pathMatch[1] : '';

          const methodMatch = requestOptions.match(/method:\s*[`'"]([^`'"]+)[`'"]/);
          const httpMethod = methodMatch ? methodMatch[1].toLowerCase() : 'get';

          const bodyMatch = requestOptions.match(/body:\s*([^,\n}]+)/);
          const hasBody = !!bodyMatch;
          const bodyParam = bodyMatch ? bodyMatch[1].trim() : null;

          const fnName = functionName.charAt(0).toLowerCase() + functionName.slice(1);
          const pathQuote = apiPath.includes('${') ? '`' : "'";

          apiContent += `export function ${fnName}(${params}) {\n`;
          if (hasBody && bodyParam) {
            apiContent += `  return request.${httpMethod}<${returnType}>(${pathQuote}${apiPath}${pathQuote}, ${bodyParam});\n`;
          } else {
            apiContent += `  return request.${httpMethod}<${returnType}>(${pathQuote}${apiPath}${pathQuote});\n`;
          }
          apiContent += `}\n\n`;
        }

        fs.writeFileSync(apiFilePath, apiContent, 'utf8');
        console.log(`✓ API文件已生成: ${apiFilePath}`);
      }

      console.log(`临时文件已保留在: ${tempDir}`);
      console.log(`✓ ${module} 模块生成完成`);
    } catch (error) {
      console.error(`生成 ${module} 模块失败：`, error);
    }
  }
  console.log('\n✅ 所有模块生成完成！');
  console.log(`类型文件位置: ${typesDir}`);
  console.log(`API文件位置: ${apisDir}`);
}

generateApiFiles();