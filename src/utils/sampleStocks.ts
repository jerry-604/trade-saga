const sampleStocks = [
  {
  "stockName": "Apple",
  "symbol": "AAPL",
  "logo": "//cdn.wealthbase.com/attachments/10ae50c8510d36056edf363281124638af7695c2/store/fill/138/138/bd317bc5a18128a69d90227f3558b332ef4d42322323264cf6efc2aa44bb/logo_image.png"
  },
  {
  "stockName": "Microsoft",
  "symbol": "MSFT",
  "logo": "//cdn.wealthbase.com/attachments/a786da53f1d5f6afeeaf8dbd34abd02dfaa246fa/store/fill/138/138/436748b1607b32051f2067c5947ff56509b2ba9f007d291d81d68c4f794b/logo_image.png"
  },
  {
  "stockName": "Amazon",
  "symbol": "AMZN",
  "logo": "//cdn.wealthbase.com/attachments/77514113bd7a199018aa0e9c06323d726f53f9cc/store/fill/138/138/19fbdfc473d0fa28704d10f11c13d412549e109fa0939252f2762c88ddbd/logo_image.png"
  },
  {
  "stockName": "Alphabet",
  "symbol": "GOOGL",
  "logo": "//cdn.wealthbase.com/attachments/8723873674c60d8708cc0b2dc243f58641e48b60/store/fill/138/138/0c0417e3ca39ab0e9b594ce7399b82cdf7fbd5e43c85d9afdb104f463357/logo_image.png"
  },
  {
  "stockName": "Meta",
  "symbol": "FB",
  "logo": "//cdn.wealthbase.com/attachments/af19ebe9a3fd318d36ad74a422ca23504e11e4cd/store/fill/138/138/b78a8271b613489eee2c483f6cec7d1b5fcba4783e1fe984b40f75229ade/MVRS.png"
  },
  {
  "stockName": "Visa",
  "symbol": "V",
  "logo": "//cdn.wealthbase.com/attachments/59c6e7ff313a8b90f26d75529e456cac0a7ba35c/store/fill/138/138/3e553186dfa0118f554a9dba63c111fd3d15457c9bb7edf13aafe06d0d3e/logo_image.png"
  },
  {
  "stockName": "JPMorgan",
  "symbol": "JPM",
  "logo": "//cdn.wealthbase.com/attachments/9f033f595b9db0c93a225fc130a24bc7889eb880/store/fill/138/138/0b06c13113b70ea3f98b7776d3a105539366d7ded263cd0cc266286e4e56/JPM.png"
  },
  {
  "stockName": "J&J",
  "symbol": "JNJ",
  "logo": "//cdn.wealthbase.com/attachments/ba8f039a29c99e37140847d676b9571cab16e528/store/fill/138/138/9191530412b74f1259fc6c6bd515b71f39f7f1a6ece0f6ca2e95781f0089/logo_image.png"
  },
  {
  "stockName": "Walmart",
  "symbol": "WMT",
  "logo": "//cdn.wealthbase.com/attachments/e64b3a7292b40a2974a5b03893fb8bfb84d4ebb5/store/fill/138/138/c2082be841afd465c447a9a61f7353c0b33ee2f5fced976c65372f0268fb/WMT.png"
  },
  {
  "stockName": "P&G",
  "symbol": "PG",
  "logo": "//cdn.wealthbase.com/attachments/1905ffa1beefbe6ca5827d13527574cb72f3cfbb/store/fill/138/138/c9e7c790b8d8c9374b1c063ae1bff9c9bbaf9544ea27c22b949dcfef54e9/logo_image.png"
  },
  {
  "stockName": "Tesla",
  "symbol": "TSLA",
  "logo": "//cdn.wealthbase.com/attachments/c573224f49ee1bd58c08090e46f779396953317f/store/fill/138/138/d4e2a5c3db310219459c78a0e555232061fc1ae05a3b98ab4ac39700a0ce/logo_image.png"
  },
  {
  "stockName": "MasterCard",
  "symbol": "MA",
  "logo": "//cdn.wealthbase.com/attachments/d6fbb074db48888c557e62628253daf5083bf92b/store/fill/138/138/4a42daa45df21c75aaeeb2698e3580ef35c03a6c76cb981f483355b3e7c6/MA.png"
  },
  {
  "stockName": "NVIDIA",
  "symbol": "NVDA",
  "logo": "//cdn.wealthbase.com/attachments/927506a619c5d1ce707a6d0a90968f29b34df4e7/store/fill/138/138/7e7e52c38ae141dee9fe7f2d9ede36429163b9270387d29bf50ea232b17c/logo_image.png"
  },
  {
  "stockName": "Home Depot",
  "symbol": "HD",
  "logo": "//cdn.wealthbase.com/attachments/8555f63213cf86d71682a775652a1826f20da1b7/store/fill/138/138/30019fa6d1bbd18f4c6d647af6fb5768ac9d803254c60cc419dd4252c746/logo_image.png"
  },
  {
  "stockName": "PayPal",
  "symbol": "PYPL",
  "logo": "//cdn.wealthbase.com/attachments/bc49fee0eb5b9df4d2af3ecc87a219d835b2b22d/store/fill/138/138/061233c28c506f3bf8fc3af078860fab7403f7b61f852062274af7398d77/logo_image.png"
  },
  {
  "stockName": "BOA",
  "symbol": "BAC",
  "logo": "//cdn.wealthbase.com/attachments/da4c6a00603aac32eefe65bc5abfadabfb888cdc/store/fill/138/138/f0cb83ed0da2e9cec24e15f004edb103e559acff2775af02b1db97807d1d/BAC.png"
  },
  {
  "stockName": "Verizon",
  "symbol": "VZ",
  "logo": "//cdn.wealthbase.com/attachments/009faa5ecfa1cbdf299ea5306c80fbccc3ebce89/store/fill/138/138/08ec65f2335ab1636734f3c9293aaba74778d427debefca71d3390e8e02b/VZ.png"
  },
  {
  "stockName": "Coca-Cola",
  "symbol": "KO",
  "logo": "//cdn.wealthbase.com/attachments/8120af5e365dd47b75472321dd6579a232e62f66/store/fill/138/138/5615c05fdd8a53318f13f4c9da9e1b79b0592b0db980f9f58a8fa1f00999/KO.png"
  },
  {
  "stockName": "Comcast",
  "symbol": "CMCSA",
  "logo": "//cdn.wealthbase.com/attachments/cf77c39a0b24f0f6c5590969c7a31d20df78688a/store/fill/138/138/9af793fab2f247b5fa8eca4047d4765f973bca05ad54e24a57d4d822d8de/logo_image.png"
  },
  {
  "stockName": "Pfizer",
  "symbol": "PFE",
  "logo": "//cdn.wealthbase.com/attachments/54ca586ba734895dae72fbd32aaec4a89889cf0c/store/fill/138/138/8a96d06b410e9a899ded5ca9b13a046f5e8f9fe0fb955c790c8a3cfcbb44/logo_image.png"
  },
  {
  "stockName": "Adobe",
  "symbol": "ADBE",
  "logo": "//cdn.wealthbase.com/attachments/81c94e998345f67dac859110c5a0c32832136fbd/store/fill/138/138/d6026c16bbc2792c9b9776a286db03cf3186b048c7127e6fd5d630e7b347/logo_image.png"
  },
  {
  "stockName": "Cisco",
  "symbol": "CSCO",
  "logo": "//cdn.wealthbase.com/attachments/951e36e3eb5cd353eaa700aa315cbb2b25e73c04/store/fill/138/138/56c36455ef9ef54e33a8d8f2e3741b263404577c6318b59c1459a9d60a1b/logo_image.png"
  },
  {
  "stockName": "Netflix",
  "symbol": "NFLX",
  "logo": "//cdn.wealthbase.com/attachments/5c056d2db9d426e6465cd7a89ad046a94bff2b96/store/fill/138/138/fb17fd8cb6dfa61b5885aeabc1058e6b814b0819b8d2f6a88e18cc5d589c/logo_image.png"
  },
  {
  "stockName": "PepsiCo",
  "symbol": "PEP",
  "logo": "//cdn.wealthbase.com/attachments/2eca33465b5d92eeaef37b4565b2aefc858ae583/store/fill/138/138/0d9fd88fb3680d44b0760f0ad58826859c74d57e98ba46a756a31bb10d77/logo_image.png"
  },
  {
  "stockName": "Intel",
  "symbol": "INTC",
  "logo": "//cdn.wealthbase.com/attachments/6f0d6878952b4ca7c02b34494e0e7616cd45d7b6/store/fill/138/138/786bc5013ce318cb8aa1c2f17307f6e56e288fe97e84078bd2472bebab8c/INTC.png"
  },
  {
  "stockName": "ExxonMobil",
  "symbol": "XOM",
  "logo": "//cdn.wealthbase.com/attachments/124c6a881fd01ba22f53db7b8b665d0bbc87bd6e/store/fill/138/138/00d54a1762917bcc12a36fefcfb8d38c84b95208e4f79f86910e9f4f64fe/logo_image.png"
  },
  {
  "stockName": "Costco",
  "symbol": "COST",
  "logo": "//cdn.wealthbase.com/attachments/d203682990146e662125e3362e43ac8f9d57bb37/store/fill/138/138/2cdb5ac3ab7281787b2b087ee10b20dbaf2a7b74b819f6f0ed4e5b04a311/logo_image.png"
  },
  {
  "stockName": "Chevron",
  "symbol": "CVX",
  "logo": "//cdn.wealthbase.com/attachments/e23ec7491f5a3f417e47c451b20b9415df5d1b83/store/fill/138/138/237460e2280547b7c6fb4ce45aa4bc847758122d32289ef1d4d61ea956ce/CVX.png"
  },
  {
  "stockName": "Twitter",
  "symbol": "TWTR",
  "logo": "//cdn.wealthbase.com/attachments/c92cd9e1237acdcbc4d86bad7dfb78604a13cf85/store/fill/138/138/cf7897dd77a84e13d61a81b18ad37a0420e1e91c7fb7e0e9e58f04961424/logo_image.png"
  },
  {
  "stockName": "Duolingo",
  "symbol": "DUOL",
  "logo": "//cdn.wealthbase.com/attachments/0834cfc3a1f9fda6b010a3451853d9d611a11512/store/fill/138/138/7fa0d9eb0b8b0f46c9f9d5aad375c70922fb843bc6d1f3356d7d62fa5e8e/DUOL.png"
  },
  {
  "stockName": "Disney",
  "symbol": "DIS",
  "logo": "//cdn.wealthbase.com/attachments/ee52740660c4c43692d319f7518a34717d83cc1e/store/fill/138/138/765545634fbdeb8d239b9ebe0d5e02bcfc28b75d230385ed6a32c69c0e0f/logo_image.png"
  },
  {
  "stockName": "Lyft",
  "symbol": "LYFT",
  "logo": "//cdn.wealthbase.com/attachments/8c488f3439c9aa0eeebfa53ab1b7aabb6868baa6/store/fill/138/138/4629c3289fd86371c0eab44fa1391d7a2d61cd3067019ae7761876d918f8/LYFT.png"
  },
  {
  "stockName": "Uber",
  "symbol": "UBER",
  "logo": "//cdn.wealthbase.com/attachments/6317699603dc947653904c718a9a21df093097f3/store/fill/138/138/0dd97bc8a16081fb56c05b63dc1e6e828b27821b9b993ffc46a629f0993d/UBER.png"
  },
  {
  "stockName": "Vanguard",
  "symbol": "VUG",
  "logo": "//cdn.wealthbase.com/attachments/9661af065fe23008804f3a7f8ac4b6ed7b4aa54f/store/fill/138/138/729bf2c3efff9585308b1cd63ee2d1303ae4c7e39c1e5c5f755ac496b076/logo_image.png"
  },
  {
  "stockName": "Airbnb",
  "symbol": "ABNB",
  "logo": "//cdn.wealthbase.com/attachments/a63ddb7a5e869a77cd9c5b27c06b268d1e2cdbda/store/fill/138/138/8ebda22820792d99a16e98a4131b0d4cf78785fb8355bb9dd59cab82d8c5/ABNB.png"
  }
  ]
  
  
  export default sampleStocks;
  