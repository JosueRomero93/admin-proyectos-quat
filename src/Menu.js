import React from "react";

import { Menu, Icon } from "antd";
import MenuSettings from "./menu/MenuSettings";

import event from "./Event";

const SubMenu = Menu.SubMenu;
const Item = Menu.Item;

export default class Component extends React.Component {

    state = {
        route: [],
        components: [],
        parentKey: "",
        selectedKey: "",
        selectedComponent: null
    };

    render() {
        return (
            <Menu
              mode="inline"
              inlineCollapsed={true}
              selectedKeys={[this.selectedKey]}
              defaultOpenKeys={MenuSettings.map(menu => menu.id)}
              style={{ height: '100%', borderRight: 0 }}
              // onSelect={(e) => {
              //   console.log(e.key);
              // }}
            >
              {
                MenuSettings.map((menu) => {
                  return (
                    <SubMenu
                      key={menu.id} 
                      title={ 
                        <span>
                          <Icon type={menu.icon} />{menu.label}
                        </span>
                      }
                    >
                    {
                      menu.options
                        .filter((option) => {
                          for (let permission of (option.permissions || [])) {
                            if (this.props.permissions.indexOf(permission) < 0) {
                              return false;
                            }
                          }
                          return true;
                        })
                        .map((option) => (
                          <Item
                            key={`${menu.id}-${option.id}`}
                            onClick={(e) => {
                              option.route = e.key.split("-");
                              event.fire("select/option", option);
                              // if (this.props.onSelect) {
                              //   this.props.onSelect(option);
                              // }
                              // console.log("Selected item:", e.key);
                            }}
                          >
                            {option.label}
                          </Item>
                        ))
                    }
                    </SubMenu>      
                  );
                }).filter(sub => {
                  return sub.props.children.length > 0;
                })
              }
            </Menu>
        );
    }

}