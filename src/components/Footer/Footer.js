import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './footer.scss'

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.links = [
      {
        to: '/home',
        name: '首页',
        icon: 'icon-ic_commodity_home',
      },
      {
        to: '/search',
        name: '分类',
        icon: 'icon-menusearch',
      },
      {
        to: '/cart',
        name: '购物车',
        icon: 'icon-ic_commodity_shoppin',
      },
      {
        to: '/personal',
        name: '个人中心',
        icon: 'icon-menumypage',
      }
    ]
  }
  render() {
    return (
      <div>
        <nav>
          {
            this.links.map((link, index) => {
              return <NavLinkItem {...link} key={index} />
            })
          }
        </nav>
      </div>
    )
  }
}

function NavLinkItem(props) {
  const { to, name, icon } = props;
  return <NavLink to={to} className='nav-item' activeClassName="active">
    <div className="name">{name}</div>
    <div className="icon"><i className={`iconfont ${icon}`}></i></div>
  </NavLink>
}
