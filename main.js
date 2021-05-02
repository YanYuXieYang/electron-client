/*
 * @Author: your name
 * @Date: 2021-03-22 16:21:38
 * @LastEditTime: 2021-03-26 18:26:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-client\main.js
 */
// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')
/* windows 7 32位，调用C# DLL，var edge = require('electron-edge-js') 时报错如下：
未处理的异常:  System.BadImageFormatException: 未能加载文件或程序集“edge_nativeclr.node”或它的某一个依赖项。生成此程序集的运行时比当前加载的运行时新，无法加载此程序集。
文件名:“edge_nativeclr.node”
*/
/* dll_csharp/AnyCpu 和 dll_csharp/x64 均能在windows10 64位系统调用。dll_csharp/x86 调用报错"试图加载格式不正确的程序。
 */
// var edge = require('electron-edge-js')
/* windows 7 32位，调用C++ DLL时多数情况是成功的并且网页加载成功。有时会导致网页加载空白，但调用dll函数成功，报错如下：
Exception thrown during bootstrapping
Error installing extension 'extensions::SafeBuiltins'.
*/
const ffi = require('ffi-napi');



function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // 调用C#代码
  // helloWorld('JavaScript', function (error, result) {
  //   if (error) throw error
  //   console.log(result)
  // })

  // // 调用C# DLL
  // // password(null, function (error, result) {
  // //   if (error) throw error
  // //   console.log(result)
  // // })

  // // 调用C# DLL 教程
  // add(3, function (error, result) {
  //   if (error) throw error
  //   console.log(result)
  // })

  // getPerson(null, function (error, result) {
  //   if (error) throw error
  //   console.log(result)
  // })

  // addOne(1, function (error, result) {
  //   if (error) throw error
  //   console.log(result)
  // })
  // // addTwo(1, function (error, result) {
  // //   if (error) throw error
  // //   console.log(result)
  // // })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// 调用C#代码
// var helloWorld = edge.func(`
//     async (input) => { 
//         return "Hellow world " + input.ToString(); 
//     }
// `)

// var helloWorld = edge.func(`

//     using System;
//     using System.Collections.Generic;
//     using System.Linq;
//     using System.Text;
//     using System.Threading.Tasks;
//     using System.Runtime.InteropServices;
//     using System.Windows;
//     //using System.Windows.Controls;
//     //using System.Windows.Forms;
//     public class Person
//     {
//         public int anInteger = 1;
//         public double aNumber = 3.1415;
//         public string aString = "foo";
//         public bool aBoolean = true;
//         public byte[] aBuffer = new byte[10];
//         public object[] anArray = new object[] { 1, "foo" };
//         public object anObject = new { a = "foo", b = 12 };
//     }

//     public class Startup
//     {
//       //DllImport("user32.dll", EntryPoint="MessageBoxA")]
//       //static extern int MsgBox(int hWnd, string msg, string caption, int type);

//       public async Task<object> Invoke(dynamic input)
//       {
//           Console.WriteLine("Execute C# code success !");

//           //MsgBox(0," 这就是用 DllImport 调用 DLL 弹出的提示框哦！ "," 挑战杯 ",0x30);

//           //UserControl uc = new UserControl();

//           // System.Windows.Window win = new System.Windows.Window();
//           // win.Width = 200;
//           // win.Height = 200;
//           // win.Show();

//           Person person = new Person();
//           return person;
//       }
//     }
// `)

// 调用C# DLL
// if (process.env.NODE_ENV !== 'development') {
//   global.__dll_csharp = require('path').join(__dirname, '/dll_csharp/x86').replace(/\\/g, '\\\\')
// }

// 调用C# DLL 教程
// //  dll_csharp/AnyCpu 和 dll_csharp/x64 均能在windows10 64位系统调用。dll_csharp/x86 调用报错"试图加载格式不正确的程序。
// if (process.env.NODE_ENV !== 'development') {
//   global.__static = require('path').join(__dirname, '/dll_csharp/AnyCPU').replace(/\\/g, '\\\\')
// }

// let add = edge.func({
//   assemblyFile: path.join(__static, 'ClassLibrary1.dll'),
//   typeName: 'ClassLibrary1.Class1',
//   methodName: 'Add'
// })

// let getPerson = edge.func({
//   assemblyFile: path.join(__static, 'ClassLibrary2.dll'),
//   typeName: 'ClassLibrary2.Class2',
//   methodName: 'GetPerson'
// })

// let addOne = edge.func({
//   assemblyFile: path.join(__static, 'ClassLibrary1.dll'),
//   typeName: 'ClassLibrary1.Class1',
//   methodName: 'AddOne'
// })

// // let addTwo = edge.func({
// //   assemblyFile: path.join(__static, 'ClassLibrary1.dll'),
// //   typeName: 'ClassLibrary1.Class1',
// //   methodName: 'AddTwo'
// // })

// 调用C++ DLL 教程
// console.log(__dirname + "\\dll_cplusplus\\x64\\Dll1.dll");//确认dll库的路径是否正确
const libm = ffi.Library(__dirname + '\\dll_cplusplus\\x86\\Dll1.dll', {
  'add': ['int', ['int', 'int']]
});

const result = libm.add(1, 1);

console.log(result);//这里会打印出正确的的计算结果