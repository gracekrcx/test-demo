## 01-API 資料夾    
- 用 api 的方式去訪問 account.myweb.com 情境說明寫在 issue > 01-API 
## 02-redirect 資料夾     
- 導頁到 account.myweb.com 情境說明寫在 issue > 02-redirect 

## 疑問
*01-API* 裡，我預期步驟 2  `account.myweb.com` set-cookie 後，步驟 4 相同 `.myweb.com` 的 `www.myweb.com` 可以拿到相同的 cookie，也就是 'localhost:5000' set-cookie 後 'localhost:3000' 可以拿到相同的 cookie，但沒有，所以一定是我哪裡沒有搞清楚。   
*02-redirect* 用導頁的方式去訪問 `account.myweb.com` 後，`www.myweb.com` 可以順利拿到 accessToken cookie    
*01-API* 和 *02-redirect* 對 set cookie 一個成功一個失敗是我現在最大的疑問。     
*01-API* 和 *02-redirect* 起服務的方式有寫在各自資料夾的 readme.md 裡。    
