# ZWALLET BACK-END

repo ini berisi project zwallet back-end, yang mana di Zwallet back-end ini telah saya buat beberapa EndPoint API, diantaranya :

1. <b>users</b>
2. <b>transfers</b>
3. <b>topup</b>

## Cara mengakses project zwallet-backend

1. Pastikan sudah menginstall nodejs, xampp, postman (optional).
2. Jalankan MYSQL SERVER di xampp
3. Buat Database bernama zwallet dan kemudian Import database mysql zwallet di folder utama database/zwallet.mysql
4. install semua module yang diperlukan dengan mengetik npm install dan kemudian enter (pastikan internet tersedia) di cmd pada direktori Zwallet-BackEnd
5. Masih di direktori yang sama, jalankan express server dengan mengetik npm run start
6. akses endpoint api dengan menggunakan postman (rekomendasi)
7. Klik dibagian Request example dibagian bawah untuk melihat contoh request yang valid

## Penjelasan EndPoint API

1.  <b>users</b> <br>
    Berisi data identitas yang dikhusus kan untuk user yang mendaftar dizwallet, Di endpoint ini server menerima beberapa method request, Diantaranya :<br>
    <b>GET, GET BY ID, GET BY FIRSTNAME & PHONE NUMBER & LIMIT, DELETE, PATCH, INSERT.</b>
2.  <b>transfers</b><br>
    Berisi data transfer user yang mana ketika user mengirim sebuah data transfer ke endpoint ini harus memerhatikan id pengirim dan id penerima, juga di endpoint ini saldo "si pengirim" akan dicek terlebih dahulu sebelum sipengirim mentransfer uang digital nya.
    Di endpoint ini server menerima beberapa method request, Diantaranya :<br>
    <b>GET, GET BY ID, GET DATA TRANSFER BY FIRSTNAME (User), TYPE (Receiver or Transfer) & LIMIT (Default = 10), INSERT, DELETE.</b>
3.  <b>top up</b><br>
    Berisi data topup, yang mana di endpoint ini memungkinkan mengirim uang selain dari user ke user, tapi dari nama pengirim (misalkan nama Bank) ke user, ketika ditambahkan data topup itu artinya saldo si user yang menerima akan ditambah.
    Di endpoint ini server menerima beberapa method request, Diantaranya :<br>
    <b>GET, GET BY ID, GET BY FIRSTNAME (user) & LIMIT(Default=10), INSERT, DELETE.</b>

## DEMO PROJECT
https://zwallet-gefy.fwdev.online

## Repo Zwallet Front End
https://github.com/Gefyaqiilah/Zwallet-Front-End

## Request Example 
https://explore.postman.com/templates/14484/zwallet-back-end
