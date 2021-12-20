import Layout from "@/layouts";
export default [
    {
        path: "/",
        // component: () => import("@/layouts"),
        component: Layout,
        isAsync: false,
        routes: [
            { path: "/", redirect: "/welcome" },
            {
                path: "welcome",
                title: "欢迎1",
                component: () => import("@/page/Welcome"),
            },
            {
                path: "imageTest",
                title: "图片和cssModul打包",
                component: () => import("@/page/ImageCssModuleTest"),
            },
            {
                path: "iconTest",
                title: "图标打包",
                component: () => import("@/page/IconTest"),
            },
            {
                path: "antdTest",
                title: "antd 接入",
                component: () => import("@/page/AntdTest"),
            },
            {
                path: "ReduxTest",
                title: "Redux 接入",
                component: () => import("@/page/ReduxTest"),
            },
            {
                path: "RequestTest",
                title: "Request 接入",
                component: () => import("@/page/RequestTest"),
            },
        ],
    },
];
//# sourceMappingURL=route.js.map