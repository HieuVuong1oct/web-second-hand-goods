import SvgColor from 'src/components/svg-color'

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
)

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'product',
    path: '/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'order',
    path: '/order',
    icon: icon('ic_cart'),
  },

  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
]

export default navConfig
