import React from "react";
import {Avatar, Button, Col, Menu, MenuProps, Row} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {logoutThunkCreator} from "../redux/auth-reducer";
import {AppStateType} from "../redux/reduxStore";
import {Header} from "antd/lib/layout/layout";

const items1: MenuProps['items'] = ['Profile', 'Developers', 'Settings'].map(key => ({
    key,
    label: key,
}));

export const HeaderComponent = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)
    const login = useSelector<AppStateType, string | null>(state => state.auth.login)
    const logout = () => {
        dispatch(logoutThunkCreator())
    }
    return (
        <Header className="header">
            <div className="logo"/>
            <Row>
                <Col span={18}>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']} items={items1}/>
                </Col>
                    {isAuth && <>
                        <Col span={1}>
                            <Avatar alt={login || 'login'} style={{backgroundColor: '#ff0063'}}
                                    icon={<UserOutlined/>}/>
                        </Col>
                        <Col span={5}>
                            <Button onClick={logout}>logOUT</Button>
                        </Col>
                    </>
                    }
            </Row>
        </Header>
    )
}