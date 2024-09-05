import SvgColor from 'src/components/svg-color'

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
)

const navConfig = [
  {
    title: 'Top 3 sản phẩm',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Quản lý người dùng',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Quản lý sản phẩm',
    path: '/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'Phê duyệt sản phẩm',
    path: '/order',
    icon: icon('ic_cart'),
  },

]

export default navConfig
