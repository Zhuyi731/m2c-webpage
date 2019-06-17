import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Editor from 'for-editor'
import m2c from "./utils/m2c"
import "./index.css"

class App extends Component {
    constructor() {
        super()
        let initText = `# 一级标题

一级标题
===

## 二级标题 

二级标题
---

### 三级标题  

- **加粗**
- *斜体*
- ~~删除线~~
- \`行内代码\`

> 引用  

[链接](https://github.com/Zhuyi731/m2c)


\`\`\`javascript
var i = 1 //代码
console.log("This is code block")
\`\`\`


![图片](https://www.google.com.hk/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png)

## 表格

First Header  | Second Header
------------- | -------------
Content Cell  | Content Cell
Content Cell  | Content Cell
*inline style* | **inline style**

表情包
:)

`
        this.state = {
            value: initText,
            confluenceValue: m2c(initText).replace(/\n\n$/, '')
        }
    }

    handleChange (value) {
        // let confluenceValue = m2c(value)
        // let confluenceValue = m2c(value).replace(/&/g, '&amp;').replace(/\n/g, '<br>').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        this.setState({
            value,
            confluenceValue: m2c(value).replace(/\n\n$/, '')
        })
    }

    copy () {
        let content = document.getElementById("content")
        content.select()
        document.execCommand('Copy')
        alert('复制成功')
    }

    save () {
        let blob = new Blob([this.state.value], { type: 'text/html' })
        let url = URL.createObjectURL(blob)
        let a = document.createElement('a')
        a.href = url
        a.download = `m2c.md`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }

    render () {
        const { value, confluenceValue } = this.state
        return (
            <div className="wrapper">
                <Editor className="markdown-editor" lineNum={true} value={value} onChange={this.handleChange.bind(this)} onSave={this.save.bind(this)} />
                <div className="confluence-editor">
                    <button className="copy-btn" onClick={this.copy.bind(this)}>Copy</button>
                    <textarea readOnly id="content" className="content" value={confluenceValue}></textarea>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)