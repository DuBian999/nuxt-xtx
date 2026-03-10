// 分类商品类型
export interface CategoryGoods {
  /** 商品ID */
  id: string;
  /** 商品名称 */
  name: string;
  /** 商品描述 */
  desc: string;
  /** 商品价格 */
  price: string;
  /** 商品图片 */
  picture: string;
  /** 排序序号（可能为null） */
  orderNum: number | null;
}

// 子分类类型
export interface ChildCategory {
  /** 子分类ID */
  id: string;
  /** 子分类名称 */
  name: string;
  /** 子分类图片 */
  picture: string;
  /** 子分类的子分类（可能为null） */
  children: null | any[];
  /** 子分类下的商品（可能为null） */
  goods: null | any[];
}

// 主分类类型
export interface Category {
  /** 分类ID */
  id: string;
  /** 分类名称 */
  name: string;
  /** 分类图片 */
  picture: string;
  /** 子分类列表 */
  children: ChildCategory[] | null;
  /** 商品列表 */
  goods: CategoryGoods[] | null;
}

export interface HomeBanner {
  hrefUrl: string;
  id: string;
  imgUrl: string;
  type: string;
}
