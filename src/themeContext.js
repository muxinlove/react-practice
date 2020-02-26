import React from 'react'

// 创建context 上下文
// 可以设置默认值 在没有匹配到provider的使用 value为当前设置的默认值
export const ThemeContext = React.createContext({ themeColor: 'pink' });
// 接收者 提供者
export const ThemeProvider = ThemeContext.Provider;
// 消费者
export const ThemeConsumer = ThemeContext.Consumer;