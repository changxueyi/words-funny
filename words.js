/* 开心学单词 · 词库数据。每个单词含：英文、音标、中文、图片(emoji)、例句。 */
window.WORD_BOOKS = [
  {
    id: "animals",
    title: "动物乐园",
    en: "Animals",
    color: "#2fb867",
    tint: "#e6f7ec",
    emoji: "🦁",
    words: [
      { en: "dog", ipa: "/dɔːɡ/", zh: "狗", pic: "🐶", ex: "My dog likes to run.", exZh: "我的狗喜欢奔跑。" },
      { en: "cat", ipa: "/kæt/", zh: "猫", pic: "🐱", ex: "The cat is sleeping.", exZh: "猫正在睡觉。" },
      { en: "rabbit", ipa: "/ˈræbɪt/", zh: "兔子", pic: "🐰", ex: "The rabbit eats carrots.", exZh: "兔子吃胡萝卜。" },
      { en: "lion", ipa: "/ˈlaɪən/", zh: "狮子", pic: "🦁", ex: "The lion is very strong.", exZh: "狮子非常强壮。" },
      { en: "monkey", ipa: "/ˈmʌŋki/", zh: "猴子", pic: "🐵", ex: "A monkey climbs the tree.", exZh: "猴子爬上树。" },
      { en: "elephant", ipa: "/ˈelɪfənt/", zh: "大象", pic: "🐘", ex: "The elephant is big.", exZh: "大象很大。" },
      { en: "bird", ipa: "/bɜːrd/", zh: "鸟", pic: "🐦", ex: "The bird can fly.", exZh: "鸟会飞。" },
      { en: "fish", ipa: "/fɪʃ/", zh: "鱼", pic: "🐟", ex: "Fish live in water.", exZh: "鱼生活在水里。" },
      { en: "bear", ipa: "/ber/", zh: "熊", pic: "🐻", ex: "The bear loves honey.", exZh: "熊喜欢蜂蜜。" },
      { en: "duck", ipa: "/dʌk/", zh: "鸭子", pic: "🦆", ex: "The duck swims fast.", exZh: "鸭子游得很快。" },
      { en: "tiger", ipa: "/ˈtaɪɡər/", zh: "老虎", pic: "🐯", ex: "The tiger runs fast.", exZh: "老虎跑得很快。" },
      { en: "pig", ipa: "/pɪɡ/", zh: "猪", pic: "🐷", ex: "The pig is pink.", exZh: "小猪是粉色的。" }
    ]
  },
  {
    id: "food",
    title: "美味食物",
    en: "Food",
    color: "#ff8a3d",
    tint: "#fff0e4",
    emoji: "🍎",
    words: [
      { en: "apple", ipa: "/ˈæpl/", zh: "苹果", pic: "🍎", ex: "I eat an apple.", exZh: "我吃一个苹果。" },
      { en: "banana", ipa: "/bəˈnænə/", zh: "香蕉", pic: "🍌", ex: "The banana is yellow.", exZh: "香蕉是黄色的。" },
      { en: "milk", ipa: "/mɪlk/", zh: "牛奶", pic: "🥛", ex: "I drink milk every day.", exZh: "我每天喝牛奶。" },
      { en: "bread", ipa: "/bred/", zh: "面包", pic: "🍞", ex: "She likes warm bread.", exZh: "她喜欢热面包。" },
      { en: "egg", ipa: "/eɡ/", zh: "鸡蛋", pic: "🥚", ex: "I have one egg.", exZh: "我有一个鸡蛋。" },
      { en: "cake", ipa: "/keɪk/", zh: "蛋糕", pic: "🍰", ex: "The cake is sweet.", exZh: "蛋糕很甜。" },
      { en: "rice", ipa: "/raɪs/", zh: "米饭", pic: "🍚", ex: "We eat rice for lunch.", exZh: "我们午饭吃米饭。" },
      { en: "water", ipa: "/ˈwɔːtər/", zh: "水", pic: "💧", ex: "Please give me water.", exZh: "请给我一些水。" },
      { en: "ice cream", ipa: "/aɪs kriːm/", zh: "冰淇淋", pic: "🍦", ex: "I love ice cream.", exZh: "我爱冰淇淋。" },
      { en: "orange", ipa: "/ˈɔːrɪndʒ/", zh: "橙子", pic: "🍊", ex: "The orange is juicy.", exZh: "橙子多汁。" },
      { en: "grape", ipa: "/ɡreɪp/", zh: "葡萄", pic: "🍇", ex: "Grapes are small.", exZh: "葡萄很小。" },
      { en: "noodle", ipa: "/ˈnuːdl/", zh: "面条", pic: "🍜", ex: "I like hot noodles.", exZh: "我喜欢热面条。" }
    ]
  },
  {
    id: "colors",
    title: "缤纷颜色",
    en: "Colors",
    color: "#8a6cff",
    tint: "#efeaff",
    emoji: "🌈",
    words: [
      { en: "red", ipa: "/red/", zh: "红色", pic: "🟥", ex: "The apple is red.", exZh: "苹果是红色的。" },
      { en: "yellow", ipa: "/ˈjeloʊ/", zh: "黄色", pic: "🟨", ex: "The sun is yellow.", exZh: "太阳是黄色的。" },
      { en: "blue", ipa: "/bluː/", zh: "蓝色", pic: "🟦", ex: "The sky is blue.", exZh: "天空是蓝色的。" },
      { en: "green", ipa: "/ɡriːn/", zh: "绿色", pic: "🟩", ex: "The grass is green.", exZh: "草是绿色的。" },
      { en: "orange", ipa: "/ˈɔːrɪndʒ/", zh: "橙色", pic: "🟧", ex: "I like orange shoes.", exZh: "我喜欢橙色的鞋。" },
      { en: "purple", ipa: "/ˈpɜːrpl/", zh: "紫色", pic: "🟪", ex: "The grape is purple.", exZh: "葡萄是紫色的。" },
      { en: "pink", ipa: "/pɪŋk/", zh: "粉色", pic: "🌸", ex: "The flower is pink.", exZh: "花是粉色的。" },
      { en: "black", ipa: "/blæk/", zh: "黑色", pic: "⬛", ex: "The cat is black.", exZh: "猫是黑色的。" },
      { en: "white", ipa: "/waɪt/", zh: "白色", pic: "⬜", ex: "Snow is white.", exZh: "雪是白色的。" },
      { en: "brown", ipa: "/braʊn/", zh: "棕色", pic: "🟫", ex: "The bear is brown.", exZh: "熊是棕色的。" },
      { en: "gray", ipa: "/ɡreɪ/", zh: "灰色", pic: "🐘", ex: "The elephant is gray.", exZh: "大象是灰色的。" },
      { en: "rainbow", ipa: "/ˈreɪnboʊ/", zh: "彩虹", pic: "🌈", ex: "Look at the rainbow!", exZh: "快看彩虹！" }
    ]
  },
  {
    id: "numbers",
    title: "数字时间",
    en: "Numbers",
    color: "#2fa9d6",
    tint: "#e4f4fb",
    emoji: "🔢",
    words: [
      { en: "one", ipa: "/wʌn/", zh: "一", pic: "1️⃣", ex: "I have one hat.", exZh: "我有一顶帽子。" },
      { en: "two", ipa: "/tuː/", zh: "二", pic: "2️⃣", ex: "I see two cats.", exZh: "我看见两只猫。" },
      { en: "three", ipa: "/θriː/", zh: "三", pic: "3️⃣", ex: "Three birds sing.", exZh: "三只鸟在唱歌。" },
      { en: "four", ipa: "/fɔːr/", zh: "四", pic: "4️⃣", ex: "A dog has four legs.", exZh: "狗有四条腿。" },
      { en: "five", ipa: "/faɪv/", zh: "五", pic: "5️⃣", ex: "I have five fingers.", exZh: "我有五根手指。" },
      { en: "six", ipa: "/sɪks/", zh: "六", pic: "6️⃣", ex: "Six eggs are here.", exZh: "这里有六个鸡蛋。" },
      { en: "seven", ipa: "/ˈsevn/", zh: "七", pic: "7️⃣", ex: "A week has seven days.", exZh: "一周有七天。" },
      { en: "eight", ipa: "/eɪt/", zh: "八", pic: "8️⃣", ex: "The spider has eight legs.", exZh: "蜘蛛有八条腿。" },
      { en: "nine", ipa: "/naɪn/", zh: "九", pic: "9️⃣", ex: "Nine stars shine.", exZh: "九颗星星在闪耀。" },
      { en: "ten", ipa: "/ten/", zh: "十", pic: "🔟", ex: "I can count to ten.", exZh: "我能数到十。" },
      { en: "clock", ipa: "/klɒk/", zh: "时钟", pic: "🕐", ex: "The clock is round.", exZh: "时钟是圆的。" },
      { en: "zero", ipa: "/ˈzɪroʊ/", zh: "零", pic: "0️⃣", ex: "Zero means none.", exZh: "零表示没有。" }
    ]
  },
  {
    id: "family",
    title: "家人身体",
    en: "Family",
    color: "#ff6b8b",
    tint: "#ffe9ef",
    emoji: "👪",
    words: [
      { en: "mother", ipa: "/ˈmʌðər/", zh: "妈妈", pic: "👩", ex: "I love my mother.", exZh: "我爱我的妈妈。" },
      { en: "father", ipa: "/ˈfɑːðər/", zh: "爸爸", pic: "👨", ex: "My father is tall.", exZh: "我爸爸很高。" },
      { en: "sister", ipa: "/ˈsɪstər/", zh: "姐妹", pic: "👧", ex: "My sister is kind.", exZh: "我的姐妹很善良。" },
      { en: "brother", ipa: "/ˈbrʌðər/", zh: "兄弟", pic: "👦", ex: "My brother plays ball.", exZh: "我的兄弟玩球。" },
      { en: "baby", ipa: "/ˈbeɪbi/", zh: "宝宝", pic: "👶", ex: "The baby is cute.", exZh: "宝宝很可爱。" },
      { en: "hand", ipa: "/hænd/", zh: "手", pic: "✋", ex: "Wash your hands.", exZh: "洗洗你的手。" },
      { en: "eye", ipa: "/aɪ/", zh: "眼睛", pic: "👁️", ex: "I have two eyes.", exZh: "我有两只眼睛。" },
      { en: "ear", ipa: "/ɪr/", zh: "耳朵", pic: "👂", ex: "I hear with my ears.", exZh: "我用耳朵听。" },
      { en: "nose", ipa: "/noʊz/", zh: "鼻子", pic: "👃", ex: "My nose is small.", exZh: "我的鼻子很小。" },
      { en: "mouth", ipa: "/maʊθ/", zh: "嘴巴", pic: "👄", ex: "Open your mouth.", exZh: "张开你的嘴。" },
      { en: "foot", ipa: "/fʊt/", zh: "脚", pic: "🦶", ex: "My foot is tired.", exZh: "我的脚累了。" },
      { en: "friend", ipa: "/frend/", zh: "朋友", pic: "🧑‍🤝‍🧑", ex: "You are my friend.", exZh: "你是我的朋友。" }
    ]
  },
  {
    id: "nature",
    title: "自然天气",
    en: "Nature",
    color: "#1fb6a6",
    tint: "#e2f6f3",
    emoji: "🌳",
    words: [
      { en: "sun", ipa: "/sʌn/", zh: "太阳", pic: "☀️", ex: "The sun is bright.", exZh: "太阳很明亮。" },
      { en: "moon", ipa: "/muːn/", zh: "月亮", pic: "🌙", ex: "The moon is at night.", exZh: "月亮在夜晚出现。" },
      { en: "star", ipa: "/stɑːr/", zh: "星星", pic: "⭐", ex: "A star is shining.", exZh: "一颗星星在闪耀。" },
      { en: "tree", ipa: "/triː/", zh: "树", pic: "🌳", ex: "The tree is tall.", exZh: "这棵树很高。" },
      { en: "flower", ipa: "/ˈflaʊər/", zh: "花", pic: "🌷", ex: "The flower smells good.", exZh: "花闻起来很香。" },
      { en: "rain", ipa: "/reɪn/", zh: "雨", pic: "🌧️", ex: "I like the rain.", exZh: "我喜欢下雨。" },
      { en: "snow", ipa: "/snoʊ/", zh: "雪", pic: "❄️", ex: "Snow is cold.", exZh: "雪很冷。" },
      { en: "cloud", ipa: "/klaʊd/", zh: "云", pic: "☁️", ex: "The cloud is white.", exZh: "云是白色的。" },
      { en: "wind", ipa: "/wɪnd/", zh: "风", pic: "🌬️", ex: "The wind is strong.", exZh: "风很大。" },
      { en: "sea", ipa: "/siː/", zh: "大海", pic: "🌊", ex: "The sea is deep.", exZh: "大海很深。" },
      { en: "mountain", ipa: "/ˈmaʊntən/", zh: "山", pic: "⛰️", ex: "The mountain is high.", exZh: "山很高。" },
      { en: "fire", ipa: "/ˈfaɪər/", zh: "火", pic: "🔥", ex: "Fire is hot.", exZh: "火很烫。" }
    ]
  }
];
