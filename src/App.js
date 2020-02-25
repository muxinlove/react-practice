import React from 'react';
import 'antd/dist/antd.css';
// import HocPage from "./pages/HocPage.js";
// import FormPage from "./pages/FormPage.js";
// import FormAntdPage from "./pages/FormAntdPage.js";
// import MyFormPage from "./pages/MyFormPage.js";
import DialogPage from "./pages/DialogPage.js";

function App() {
  return (
    <div className="App">
      {/* 高阶组件 */}
      {/* <HocPage /> */}

      {/* 表单组件 */}
      {/* <FormPage /> */}

      {/* 表单组件 antd create方法 */}
      {/* <FormAntdPage /> */}

      {/* 自己实现的create */}
      {/* <MyFormPage /> */}

      {/* 弹窗 */}
      <DialogPage />
    </div>
  );
}

export default App;
