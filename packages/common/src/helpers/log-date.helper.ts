export function logDate(date: Date = new Date()) {
  return `${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()} ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`
}

/**
  -> Run API  -> Duration 0 seconds
   -> api application  -> Duration 0 seconds
   -> api feature account  -> Duration 0 seconds
   -> api feature auth  -> Duration 1 seconds
   -> api feature core  -> Duration 2 seconds
   -> api feature user  -> Duration 4 seconds
   -> api e2e  -> Duration 5 seconds
   -> api run-scripts  -> Duration 6 seconds
  -> Run Mobile  -> Duration 6 seconds
   -> mobile application  -> Duration 0 seconds
   -> mobile base  -> Duration 5 seconds
   -> mobile ui  -> Duration 16 seconds
       -> generateMobileUiLibButton  -> Duration 0 seconds
         -> generateMobileUiLib button  -> Duration 0 seconds
            -> generateMobileLib ui/button end  -> Duration 4 seconds
       -> generateMobileUiLibForm  -> Duration 4 seconds
         -> generateMobileUiLib form  -> Duration 0 seconds
            -> generateMobileLib ui/form end  -> Duration 5 seconds
       -> generateMobileUiLibLoader  -> Duration 9 seconds
         -> generateMobileUiLib loader  -> Duration 0 seconds
            -> generateMobileLib ui/loader end  -> Duration 5 seconds
       -> generateMobileUiLibIcon  -> Duration 14 seconds
         -> generateMobileUiLib icon  -> Duration 0 seconds
            -> generateMobileLib ui/icon end  -> Duration 6 seconds
       -> generateMobileUiLibPage  -> Duration 21 seconds
         -> generateMobileUiLib page  -> Duration 0 seconds
            -> generateMobileLib ui/page end  -> Duration 6 seconds
       -> generateMobileUiLibPageHeader  -> Duration 27 seconds
         -> generateMobileUiLib page-header  -> Duration 0 seconds
            -> generateMobileLib ui/page-header end  -> Duration 7 seconds
       -> generateMobileUiLibSidebarPage  -> Duration 34 seconds
         -> generateMobileUiLib sidebar-page  -> Duration 0 seconds
            -> generateMobileLib ui/sidebar-page end  -> Duration 7 seconds
       -> generateMobileUiLibTable  -> Duration 41 seconds
         -> generateMobileUiLib table  -> Duration 0 seconds
            -> generateMobileLib ui/table end  -> Duration 8 seconds
   -> mobile feature about  -> Duration 64 seconds
            -> generateMobileLib about/feature end  -> Duration 8 seconds
   -> mobile feature account  -> Duration 73 seconds
            -> generateMobileLib account/feature end  -> Duration 9 seconds
            -> generateMobileLib account/ui end  -> Duration 10 seconds
   -> mobile feature auth  -> Duration 92 seconds
            -> generateMobileLib auth/data-access end  -> Duration 11 seconds
            -> generateMobileLib auth/feature end  -> Duration 12 seconds
            -> generateMobileLib auth/ui end  -> Duration 13 seconds
   -> mobile feature core  -> Duration 129 seconds
            -> generateMobileLib core/data-access end  -> Duration 15 seconds
            -> generateMobileLib core/feature end  -> Duration 15 seconds
   -> mobile feature dashboard  -> Duration 159 seconds
            -> generateMobileLib dashboard/feature end  -> Duration 16 seconds
   -> mobile feature layout  -> Duration 175 seconds
            -> generateMobileLib layout/feature end  -> Duration 16 seconds
   -> mobile feature shell  -> Duration 191 seconds
            -> generateMobileLib shell/feature end  -> Duration 17 seconds
  -> Run Web  -> Duration 215 seconds
   -> web application  -> Duration 0 seconds
   -> web base  -> Duration 22 seconds
   -> web ui  -> Duration 74 seconds
       -> generateWebUiLibButton  -> Duration 0 seconds
         -> generateWebUiLib button  -> Duration 0 seconds
            -> generateWebLib ui/button end  -> Duration 18 seconds
       -> generateWebUiLibForm  -> Duration 18 seconds
         -> generateWebUiLib form  -> Duration 0 seconds
            -> generateWebLib ui/form end  -> Duration 19 seconds
       -> generateWebUiLibLoader  -> Duration 38 seconds
         -> generateWebUiLib loader  -> Duration 0 seconds
            -> generateWebLib ui/loader end  -> Duration 21 seconds
       -> generateWebUiLibIcon  -> Duration 59 seconds
         -> generateWebUiLib icon  -> Duration 0 seconds
            -> generateWebLib ui/icon end  -> Duration 21 seconds
       -> generateWebUiLibPage  -> Duration 80 seconds
         -> generateWebUiLib page  -> Duration 0 seconds
            -> generateWebLib ui/page end  -> Duration 21 seconds
       -> generateWebUiLibPageHeader  -> Duration 101 seconds
         -> generateWebUiLib page-header  -> Duration 0 seconds
            -> generateWebLib ui/page-header end  -> Duration 22 seconds
       -> generateWebUiLibSidebarPage  -> Duration 123 seconds
         -> generateWebUiLib sidebar-page  -> Duration 0 seconds
            -> generateWebLib ui/sidebar-page end  -> Duration 23 seconds
       -> generateWebUiLibTable  -> Duration 145 seconds
         -> generateWebUiLib table  -> Duration 0 seconds
            -> generateWebLib ui/table end  -> Duration 24 seconds
       -> generateWebUiLibToast  -> Duration 169 seconds
         -> generateWebUiLib toast  -> Duration 0 seconds
            -> generateWebLib ui/toast end  -> Duration 25 seconds
   -> web feature about  -> Duration 268 seconds
     -> web feature: web7421978 about (normalize)  -> Duration 0 seconds
     -> web feature: web7421978 about (generate)  -> Duration 0 seconds
            -> generateWebLib about/feature end  -> Duration 26 seconds
   -> web feature account  -> Duration 294 seconds
     -> web feature: web7421978 account (normalize)  -> Duration 0 seconds
     -> web feature: web7421978 account (generate)  -> Duration 0 seconds
            -> generateWebLib account/feature end  -> Duration 25 seconds
     -> web feature: web7421978 account (normalize)  -> Duration 0 seconds
     -> web feature: web7421978 account (generate)  -> Duration 0 seconds
            -> generateWebLib account/ui end  -> Duration 26 seconds
   -> web feature admin  -> Duration 345 seconds
     -> web feature: web7421978 admin (normalize)  -> Duration 0 seconds
     -> web feature: web7421978 admin (generate)  -> Duration 0 seconds
              -> generateWebLib admin/feature end  -> Duration 26 seconds
       -> web feature: web7421978 admin (normalize)  -> Duration 0 seconds
       -> web feature: web7421978 admin (generate)  -> Duration 0 seconds
              -> generateWebLib admin/ui end  -> Duration 27 seconds
     -> web feature auth  -> Duration 398 seconds
       -> web feature: web7421978 auth (normalize)  -> Duration 0 seconds
       -> web feature: web7421978 auth (generate)  -> Duration 0 seconds
              -> generateWebLib auth/data-access end  -> Duration 27 seconds
       -> web feature: web7421978 auth (normalize)  -> Duration 0 seconds
       -> web feature: web7421978 auth (generate)  -> Duration 0 seconds
              -> generateWebLib auth/feature end  -> Duration 29 seconds
       -> web feature: web7421978 auth (normalize)  -> Duration 0 seconds
       -> web feature: web7421978 auth (generate)  -> Duration 0 seconds
              -> generateWebLib auth/ui end  -> Duration 29 seconds
     -> web feature core  -> Duration 484 seconds
       -> web feature core data-access  -> Duration 0 seconds
       -> web feature: web7421978 core (normalize)  -> Duration 0 seconds
       -> web feature: web7421978 core (generate)  -> Duration 0 seconds
              -> generateWebLib core/data-access end  -> Duration 30 seconds
       -> web feature core feature  -> Duration 30 seconds
       -> web feature: web7421978 core (normalize)  -> Duration 0 seconds
       -> web feature: web7421978 core (generate)  -> Duration 0 seconds
              -> generateWebLib core/feature end  -> Duration 30 seconds
     -> web feature dashboard  -> Duration 544 seconds
       -> web feature: web7421978 dashboard (normalize)  -> Duration 0 seconds
       -> web feature: web7421978 dashboard (generate)  -> Duration 0 seconds
              -> generateWebLib dashboard/feature end  -> Duration 30 seconds
     -> web feature layout  -> Duration 574 seconds
       -> web feature: web7421978 layout (normalize)  -> Duration 0 seconds
       -> web feature: web7421978 layout (generate)  -> Duration 0 seconds
              -> generateWebLib layout/feature end  -> Duration 34 seconds
     -> web feature shell  -> Duration 608 seconds
       -> web feature: web7421978 shell (normalize)  -> Duration 0 seconds
       -> web feature: web7421978 shell (generate)  -> Duration 0 seconds
              -> generateWebLib shell/feature end  -> Duration 36 seconds
    -> Run Shared Utils  -> Duration 862 seconds
              -> generateWebLib util/sdk end  -> Duration 38 seconds


4
5
5
6
6
7
7
8
8
9
10
11
12
13
15
15
16
16
17
18
19
21
21
21
22
23
24
25
26
25
26
26
27
27
29
29
30
30
30
34
36
38

 */
