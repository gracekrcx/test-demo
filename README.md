## 01-API 資料夾    
- 用 api 的方式去訪問 account.myweb.com 情境說明寫在 [issue > 01-API](https://github.com/gracekrcx/test-demo/issues/1)
## 02-redirect 資料夾     
- 導頁到 account.myweb.com 情境說明寫在 [issue > 02-redirect](https://github.com/gracekrcx/test-demo/issues/2)

## 疑問
[01-API](https://github.com/gracekrcx/test-demo/issues/1)    
[02-redirect](https://github.com/gracekrcx/test-demo/issues/2)

- *01-API* 裡，我預期步驟 2 `account.myweb.com` set-cookie 後，步驟 4 相同 `.myweb.com` 的 `www.myweb.com` 可以拿到相同的 cookie，也就是步驟 2 'localhost:5000' set-cookie 後步驟 4 'localhost:3000' 可以拿到相同的 cookie，但沒有，所以一定是哪裡我沒有搞清楚。   
- *02-redirect* 用導頁的方式去訪問 `account.myweb.com(localhost:5000)` 後，`www.myweb.com(localhost:3000)` 可以順利拿到 accessToken cookie 
- *01-API* 可以加什麼讓 cookie 被 `www.myweb.com(localhost:3000)` 取用嗎？我問 gpt 有提到反向代理，但我不了解反向代理？
- *01-API* 和 *02-redirect* 對 set cookie 一個成功一個失敗是我現在最大的疑問。     
- *01-API* 和 *02-redirect* 起服務的方式有寫在各自資料夾的 readme.md 裡。    
