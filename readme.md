# [Lunch Balance](https://sites.google.com/peplink.com/lunch)
[![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp)

[Lunch Balance Site](https://sites.google.com/peplink.com/lunch)

[Google Sheet (Database)](https://docs.google.com/spreadsheets/d/1pU4uWo6HQUNyoJ5C7ZLx-tJ1Pk0Vvxsmgc04hw0UWtw/edit?usp=sharing)


[Google App Script (Backend)](https://script.google.com/u/0/home/projects/1N0tAoXCfwq_vJlkoANn86k8q0ACPve27Ad4i-HdEn6Z-tyRe0K5pVb2X/edit)

[Phoebe Figma UI/UX Sketch](https://www.figma.com/file/Ya1LfDaUotjncmGYSUjkFR/Intranet?type=design&node-id=26%3A2&mode=dev)

[Google Site to embed and static URL](https://sites.google.com/d/1QP2lPVTie2sxlFiG-_xIkvAbCF_fo_Mc/p/1zfnLPP03dsRHqD9nEwSlbFDHZeGkkZxh/edit)

[Google App Script Dev/Head Stage](https://script.google.com/a/macros/peplink.com/s/AKfycbx0wPZ_cm3ObE9UeZkB3DOqgyLmgWdCm2lq8TZ5tbg/dev)

Current (29Nov2023) Embeded Deploy ID `AKfycbyXT3hD1Hegy6u3eyIrkvYy6w68Kcc5s40z_PoD_k0flLUCGc97WSX5VkrbyLbGrZBo`
https://script.google.com/a/macros/peplink.com/s/AKfycbyXT3hD1Hegy6u3eyIrkvYy6w68Kcc5s40z_PoD_k0flLUCGc97WSX5VkrbyLbGrZBo/exec

## Switch to Admin Accounts (Peplink,Peplink-LT,Resigned Staff)
Go to [Google Sheet (Database)](https://docs.google.com/spreadsheets/d/1pU4uWo6HQUNyoJ5C7ZLx-tJ1Pk0Vvxsmgc04hw0UWtw/edit?usp=sharing) > Statement Sheet > Your account row > Tick Admin Checkbox

Refresh [Lunch Balance Site](https://sites.google.com/peplink.com/lunch) to see if its in effect

## How to Add Colleague
**Method A (Automatic)**: Use Colleagues' Google Account to Login [Lunch Balance Site](https://sites.google.com/peplink.com/lunch)

**Method B (Manually)**: Go to [Google Sheet (Database)](https://docs.google.com/spreadsheets/d/1pU4uWo6HQUNyoJ5C7ZLx-tJ1Pk0Vvxsmgc04hw0UWtw/edit?usp=sharing) > Statement Sheet > Last Row > Insert Name, Sum (0), email

Refresh [Lunch Balance Site](https://sites.google.com/peplink.com/lunch) to see if its in effect

Lunch Balance Uses email as Primary Key, please **avoid email duplication** and use [Email Plus + Trick](https://gmail.googleblog.com/2008/03/2-hidden-ways-to-get-more-from-your.html) if necessary

## How to Remove Colleague
Go to [Google Sheet (Database)](https://docs.google.com/spreadsheets/d/1pU4uWo6HQUNyoJ5C7ZLx-tJ1Pk0Vvxsmgc04hw0UWtw/edit?usp=sharing) > Statement Sheet > Remove Row for the according record

Refresh [Lunch Balance Site](https://sites.google.com/peplink.com/lunch) to see if its in effect

## Change Weekly Schedule Email
Use Incognito Window Browser, Login [Google App Script Triggers](https://script.google.com/u/0/home/projects/1N0tAoXCfwq_vJlkoANn86k8q0ACPve27Ad4i-HdEn6Z-tyRe0K5pVb2X/triggers) as mis@peplink.com > Hover on Trigger > Click Edit Trigger Pen 🖊 (Only Trigger Owner can edit) > Select and Save as accordingly

Note: Only Trigger Owner can edit/delete trigger

## When Google App Script Codes edited
To reflect update to sites.google.com... Go to [Google App Script (Backend)](https://script.google.com/u/0/home/projects/1N0tAoXCfwq_vJlkoANn86k8q0ACPve27Ad4i-HdEn6Z-tyRe0K5pVb2X/edit) > top right corner Deploy > New Deployment > Deploy > Copy Web app URL > Go to [Google Site Editor](https://sites.google.com/d/1QP2lPVTie2sxlFiG-_xIkvAbCF_fo_Mc/p/1zfnLPP03dsRHqD9nEwSlbFDHZeGkkZxh/edit) > Right Side Click Embed > Paste URL > Insert > Top Right Publish

Refresh [Lunch Balance Site](https://sites.google.com/peplink.com/lunch) to see if its in effect

## Future Plans
✅ Embed in Intranet/Google Site (XFrameOptionsMode)

✅ Mobile Friendly

✅ Negative Expense

✅ Mobile Statement View Fix

✅ Individual Balance in History

✅ Loading Wheel (Process indicator)

✅ Lunch Balance UI / UX

✅ Join Pep Org/Enterprise github

✅ Checkbox to change to peplink@peplink.com

✅ Documentation of future maintenance and approach method

✅ Auto Add Acc

✅ Change Self Username

☐ Lunch Balance Support Attachments? Upload file to my google drive with Google Apps Script (NO FORM IN GOOGLE)

☐ Private Cache for Recent Restaurant / Debitors / Expense Title

☐ Weekly/Monthly/Yearly Lunch Expense Analysis




## Un-doable
❌ (Not in Google Admin) Ask access to Lunch_Balance@peplink.com

❌ (Not Google Admin) ghs.google.com Add lunch.peplink.com?

❌ (Not Google Admin) Google Form to update Intranet Frontpage Details

❌ (No API Key) Auto Google Contact Sync Intranet Frontpage

❌ (No API Key) Auto Add Contact to Sheet1 with Notification (GoogleJsonResponseException: API call to directory.users.list 
failed with error: Not Authorized to access this resource/api)
