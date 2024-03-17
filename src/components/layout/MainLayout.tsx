import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

export const MainLayout: React.FC = () => {
    return (
        <Layout className="w-full flex transition ease-in-out min-h-[100svh]">
            <Header style={styles.header}>
                <div className="h-full flex items-center">
                    <img width={40} className="my-auto" src="./logo.png" />
                </div>
            </Header>
            <Layout>
                <Sider style={styles.sider}></Sider>
                <Content style={styles.content}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

const styles = {
    header: {
        backgroundColor: '#fff',
        boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.16)',
        zIndex: 100,
    },
    sider: {
        backgroundColor: '#fdfdfd',
        boxShadow: '-1px 0px 0px 0px #F0F0F0 inset',
    },
    content: {
        backgroundColor: '#fafafa',
    },
};
