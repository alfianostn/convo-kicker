/* ── Closer – conversation card deck ────────────────────────── */

const decks = {
  english: {
    lovers: {
      playful: [
        "What silly thing about us would make a perfect inside joke forever?",
        "If we escaped for one unexpectedly romantic day, where would we go?",
        "What tiny habit of mine secretly makes you smile every time?",
        "What kind of date would feel playful and unforgettable for us?",
        "What nickname for us is a little embarrassing but still perfect?",
        "If our relationship were a movie genre, what would it be and why?",
        "What is the most random thing that reminds you of me?",
        "If we had a theme song, what would it be?",
        "What is something I do that you find unexpectedly adorable?",
        "If we could swap one habit each, which ones would you choose?",
        "What is the most ridiculous thing we have done together that you secretly loved?",
        "If we opened a business together, what would it be called?",
        "What would our reality TV show be about?",
        "What is something we should add to our bucket list right now?",
        "If you could relive one moment from our relationship, which one would it be?",
        "What is the weirdest food combination we would both actually try?",
        "If we were characters in a book, how would the author describe us?",
        "What is one adventure you have been too shy to suggest until now?",
        "What is something small I do that makes a regular day feel special?",
        "If we could spend one magical hour anywhere in the world, where would we go?",
      ],
      deep: [
        "What part of our relationship feels strongest to you right now?",
        "When do you feel most emotionally safe with me?",
        "What is something you hope we protect as we grow together?",
        "What future moment are you most excited to share with me?",
        "What truth about love have you learned from us?",
        "What is something you want me to understand about you that is hard to put into words?",
        "How have I changed the way you see yourself?",
        "What does home feel like to you, and do I play a part in that?",
        "Is there a fear you have about us that you have never said out loud?",
        "What is one thing you wish I celebrated more about myself?",
        "When was the first moment you knew I was someone truly special to you?",
        "What does being truly known by someone mean to you?",
        "What is one way we have grown stronger without either of us realizing it?",
        "What is something you have learned about love from watching how I love you?",
        "How do you want us to handle the difficult seasons that will come?",
        "What is a dream of yours I could help make more real?",
        "What is the most loving thing I have ever done for you without knowing it?",
        "What does commitment mean to you beyond just staying together?",
        "Is there anything you have been holding back out of fear of how I might respond?",
        "What is the one thing you want us to always come back to, no matter what?",
      ],
    },
    friends: {
      playful: [
        "What would our friendship win an award for?",
        "What random memory of us still makes you laugh instantly?",
        "If we started a ridiculous side quest together, what would it be?",
        "What song, snack, or place instantly reminds you of me?",
        "What kind of harmless trouble would be very on brand for us?",
        "If we were a duo in a heist movie, what would our roles be?",
        "What is the most chaotic thing we have done that somehow turned out great?",
        "If our friendship had a mascot, what would it be?",
        "What is something I convinced you to try that you are now secretly glad about?",
        "If we could only communicate in one way for a year, what would we choose?",
        "What is the most unhinged plan we have made and then actually followed through on?",
        "If we had a podcast, what would the first episode be about?",
        "What is a friendship tradition we should start right now?",
        "If you had to describe our friendship using only food, what would you pick?",
        "What is the most dramatically unnecessary thing we have ever done together?",
        "If our friendship was a sport, what would be our signature move?",
        "What is something I have never tried that you think I would be obsessed with?",
        "If we made a documentary about our friendship, what would be the plot twist?",
        "What would you say is our most iconic shared memory?",
        "What is the silliest thing we have argued about that still makes you laugh?",
      ],
      deep: [
        "What kind of conversations make you feel closest to a friend?",
        "What is something people often misunderstand about you at first?",
        "What part of your life feels most important to you right now?",
        "What do you wish close friends noticed about you more often?",
        "What makes a friendship feel truly safe for you?",
        "Is there something you have been going through that you have not talked about much?",
        "What is one thing you have learned about yourself in the last year?",
        "When you are struggling, what kind of support actually helps you most?",
        "What is something you are proud of that you rarely talk about?",
        "What does loyalty mean to you in a friendship?",
        "Is there a version of yourself you are still figuring out how to become?",
        "What is the bravest thing you have done that almost no one knows about?",
        "What is a belief you hold that has changed significantly over the years?",
        "When do you feel most like yourself?",
        "What is something you are still learning how to ask for?",
        "What is a part of your story that shaped who you are but rarely comes up?",
        "What does it mean to you to feel truly understood by someone?",
        "What is one thing you wish you gave yourself more credit for?",
        "Is there a dream you have quietly held onto for a long time?",
        "What would you want a close friend to know about what you are carrying right now?",
      ],
    },
  },
  indonesian: {
    lovers: {
      playful: [
        "Hal konyol apa tentang kita yang cocok jadi inside joke selamanya?",
        "Kalau kita kabur untuk satu hari romantis yang mendadak, kita mau ke mana?",
        "Kebiasaan kecilku yang mana yang diam-diam bikin kamu senyum terus?",
        "Date seperti apa yang terasa santai tapi tetap nggak terlupakan buat kita?",
        "Julukan apa buat kita yang sedikit memalukan tapi cocok banget?",
        "Kalau hubungan kita adalah genre film, genre apa dan kenapa?",
        "Hal paling random apa yang langsung bikin kamu ingat aku?",
        "Kalau kita punya lagu tema, lagu apa itu?",
        "Ada hal yang aku lakukan yang secara tak terduga bikin kamu gemas?",
        "Kalau bisa tukar satu kebiasaan satu sama lain, mana yang kamu pilih?",
        "Hal paling absurd apa yang kita lakukan bareng yang diam-diam kamu suka?",
        "Kalau kita buka usaha bareng, namanya apa?",
        "Reality TV show kita bakal tentang apa?",
        "Apa yang harus segera kita tambahkan ke bucket list kita?",
        "Kalau bisa mengulang satu momen dari hubungan kita, yang mana?",
        "Kombinasi makanan paling aneh apa yang kita berdua mau coba?",
        "Kalau kita adalah karakter dalam buku, bagaimana penulisnya mendeskripsikan kita?",
        "Ada satu petualangan yang selama ini kamu terlalu malu untuk usulkan?",
        "Hal kecil apa yang aku lakukan yang bikin hari biasa terasa spesial?",
        "Kalau kita bisa menghabiskan satu jam ajaib di mana saja di dunia, ke mana?",
      ],
      deep: [
        "Bagian apa dari hubungan kita yang terasa paling kuat buat kamu saat ini?",
        "Kapan kamu merasa paling aman secara emosional sama aku?",
        "Hal apa yang kamu harap tetap kita jaga saat hubungan kita bertumbuh?",
        "Momen masa depan apa yang paling ingin kamu jalani bareng aku?",
        "Kebenaran tentang cinta apa yang kamu pelajari dari hubungan kita?",
        "Ada sesuatu yang ingin kamu dipahami tentang dirimu yang susah diungkapkan?",
        "Bagaimana aku mengubah cara kamu melihat dirimu sendiri?",
        "Seperti apa 'rumah' bagimu, dan apakah aku punya peran dalam itu?",
        "Ada ketakutan tentang kita yang belum pernah kamu ucapkan?",
        "Apa satu hal yang kamu harap aku lebih sering rayakan tentang diriku sendiri?",
        "Kapan pertama kali kamu tahu aku adalah seseorang yang benar-benar spesial bagimu?",
        "Apa artinya benar-benar dikenal oleh seseorang bagimu?",
        "Apa satu cara kita telah tumbuh lebih kuat tanpa kita sadari?",
        "Apa yang kamu pelajari tentang cinta dari melihat cara aku mencintaimu?",
        "Bagaimana kamu ingin kita menghadapi masa-masa sulit yang akan datang?",
        "Apa satu mimpi yang bisa aku bantu wujudkan?",
        "Apa hal paling penuh kasih yang pernah aku lakukan untukmu tanpa aku sadari?",
        "Apa artinya berkomitmen bagimu selain hanya tetap bersama?",
        "Apakah ada sesuatu yang selama ini kamu tahan karena takut dengan responsku?",
        "Apa satu hal yang selalu ingin kamu kembalikan, apapun yang terjadi?",
      ],
    },
    friends: {
      playful: [
        "Kalau persahabatan kita dapat penghargaan, kategorinya apa?",
        "Kenangan random apa tentang kita yang masih bikin kamu ketawa?",
        "Kalau kita mulai side quest yang absurd bareng, itu bakal seperti apa?",
        "Lagu, makanan, atau tempat apa yang langsung bikin kamu ingat aku?",
        "Kenakalan kecil apa yang sangat cocok dengan vibe persahabatan kita?",
        "Kalau kita adalah duo dalam film heist, apa peran kita masing-masing?",
        "Hal paling kacau apa yang kita lakukan bareng yang entah bagaimana berakhir baik?",
        "Kalau persahabatan kita punya maskot, apa itu?",
        "Apa yang aku yakinin kamu untuk coba dan sekarang diam-diam kamu syukuri?",
        "Kalau kita hanya bisa berkomunikasi satu cara selama setahun, apa pilihannya?",
        "Apa rencana paling gila yang kita buat dan benar-benar kita laksanakan?",
        "Kalau kita punya podcast, episode pertamanya tentang apa?",
        "Tradisi persahabatan apa yang harus kita mulai sekarang?",
        "Kalau harus mendeskripsikan persahabatan kita menggunakan makanan, apa pilihanmu?",
        "Apa hal paling dramatis yang tidak perlu pernah kita lakukan bareng?",
        "Kalau persahabatan kita adalah olahraga, apa gerakan khas kita?",
        "Apa yang belum pernah aku coba yang kamu pikir bakal aku sukai banget?",
        "Kalau kita bikin dokumenter tentang persahabatan kita, apa plot twist-nya?",
        "Apa kenangan bersama kita yang paling ikonik menurutmu?",
        "Apa hal paling konyol yang pernah kita perdebatkan tapi masih bikin kamu ketawa?",
      ],
      deep: [
        "Percakapan seperti apa yang bikin kamu merasa paling dekat dengan teman?",
        "Apa hal yang sering disalahpahami orang tentang kamu saat pertama kenal?",
        "Bagian hidup kamu yang mana yang terasa paling penting sekarang?",
        "Apa yang kamu harap teman dekatmu lebih sering sadari tentang dirimu?",
        "Apa yang bikin sebuah persahabatan terasa benar-benar aman buat kamu?",
        "Ada sesuatu yang sedang kamu jalani tapi belum banyak kamu ceritakan?",
        "Apa satu hal yang kamu pelajari tentang dirimu sendiri setahun terakhir?",
        "Saat kamu sedang kesulitan, dukungan seperti apa yang benar-benar membantu?",
        "Apa yang kamu banggakan tapi jarang kamu ceritakan?",
        "Apa arti loyalitas bagimu dalam sebuah persahabatan?",
        "Apakah ada versi dirimu yang masih sedang kamu coba pahami?",
        "Apa hal paling berani yang pernah kamu lakukan yang hampir tidak ada yang tahu?",
        "Apa keyakinan yang kamu pegang yang sudah berubah banyak seiring waktu?",
        "Kapan kamu merasa paling menjadi dirimu sendiri?",
        "Apa yang masih sedang kamu pelajari untuk diminta dari orang lain?",
        "Apa bagian dari hidupmu yang membentuk siapa kamu tapi jarang muncul dalam percakapan?",
        "Apa artinya benar-benar dipahami oleh seseorang bagimu?",
        "Apa satu hal yang ingin kamu lebih sering hargai dari dirimu sendiri?",
        "Apakah ada mimpi yang sudah lama diam-diam kamu simpan?",
        "Apa yang ingin kamu ceritakan kepada teman dekat tentang apa yang sedang kamu tanggung sekarang?",
      ],
    },
  },
  chinese: {
    lovers: {
      playful: [
        "我们之间哪件傻傻的小事最适合变成专属玩笑？",
        "如果我们突然逃去过一个浪漫的一天，你最想去哪里？",
        "我哪个小习惯总会让你偷偷笑出来？",
        "什么样的约会会让我们觉得轻松又难忘？",
        "有什么称呼有点肉麻，但又特别适合我们？",
        "如果我们的关系是一个电影类型，会是哪种？为什么？",
        "什么最随机的事情会让你立刻想到我？",
        "如果我们有一首主题曲，会是哪首？",
        "我有什么行为出乎意料地让你觉得可爱？",
        "如果可以互换彼此一个习惯，你会选哪个？",
        "我们一起做过的最荒唐的事情中，有哪件你其实暗暗喜欢？",
        "如果我们一起开一家店，会叫什么名字？",
        "我们的真人秀会是关于什么的？",
        "现在有什么事我们应该立刻加进愿望清单？",
        "如果可以重温我们关系中的一个瞬间，你会选哪个？",
        "最奇怪的食物组合是什么，但我们两个都愿意尝试？",
        "如果我们是书里的角色，作者会怎么描述我们？",
        "有没有一次冒险，你一直太害羞开口提议？",
        "我做的哪件小事会让普通的一天变得特别？",
        "如果我们可以在世界上任何地方度过神奇的一小时，你想去哪里？",
      ],
      deep: [
        "你觉得我们关系里现在最稳固的部分是什么？",
        "什么时候你会觉得在我身边最有安全感？",
        "随着我们继续成长，你希望我们一直守住什么？",
        "你最期待和我一起经历的未来瞬间是什么？",
        "从我们的关系里，你学到了关于爱的什么真相？",
        "有没有什么关于你自己的事，你想让我理解但很难用语言表达？",
        "我如何改变了你看待自己的方式？",
        "对你来说「家」是什么感觉，我在其中扮演了什么角色？",
        "有没有关于我们的担忧，你从未说出口过？",
        "你希望我更经常认可自己的哪一件事？",
        "你第一次意识到我对你来说真的很特别是什么时候？",
        "对你来说，被某人真正了解意味着什么？",
        "我们在哪些方面变得更强大了，却连自己都没有察觉？",
        "从我爱你的方式中，你学到了什么关于爱的东西？",
        "你希望我们如何面对将要到来的困难时期？",
        "你有什么梦想是我可以帮助实现的？",
        "我做过的最有爱的一件事是什么，我自己可能都不知道？",
        "对你来说，承诺除了在一起，还意味着什么？",
        "有没有什么你一直没说，是因为担心我的反应？",
        "无论发生什么，你希望我们永远能回归的那件事是什么？",
      ],
    },
    friends: {
      playful: [
        "如果我们的友谊能得奖，会是什么奖项？",
        "我们之间哪段随机回忆现在想起来还会立刻让你笑？",
        "如果我们一起开启一个荒唐的支线任务，会是什么？",
        "哪首歌、哪种零食或哪个地方会立刻让你想到我？",
        "什么样的小麻烦最符合我们的朋友气质？",
        "如果我们是抢劫电影里的搭档，我们各自的角色是什么？",
        "我们一起做过的最混乱却莫名其妙顺利的事情是什么？",
        "如果我们的友谊有个吉祥物，会是什么？",
        "有什么事是我说服你去尝试，你现在暗地里很庆幸的？",
        "如果我们只能用一种方式沟通一整年，你会选什么？",
        "我们策划过然后真的去做的最疯狂的计划是什么？",
        "如果我们有一档播客，第一集会讲什么？",
        "我们现在应该开始哪个友谊传统？",
        "如果用食物来形容我们的友谊，你会怎么选？",
        "我们一起做过最夸张最没必要的事是什么？",
        "如果我们的友谊是一项运动，我们的标志性动作是什么？",
        "有什么我从没尝试过的事，你觉得我一定会着迷的？",
        "如果我们拍一部关于友谊的纪录片，会有什么反转？",
        "你觉得我们最具代表性的共同回忆是什么？",
        "我们争论过的最无聊的事是什么，但现在想起来还是会笑？",
      ],
      deep: [
        "什么样的聊天会让你觉得和朋友最亲近？",
        "别人刚认识你时最容易误解你的什么？",
        "你现在生活中最重要的部分是什么？",
        "你希望亲近的朋友更常注意到你哪一面？",
        "什么会让一段友谊真正让你感到安心？",
        "有没有什么事你正在经历，但还没怎么说出口？",
        "过去这一年，你对自己有什么新的认识？",
        "当你在挣扎时，什么样的支持对你真正有帮助？",
        "有什么是你感到骄傲但很少提起的事？",
        "在友谊中，忠诚对你意味着什么？",
        "有没有一个还在摸索中的自己，你还在慢慢认识？",
        "你做过的最勇敢的事是什么，几乎没人知道？",
        "有什么信念是你多年来改变了很多的？",
        "你什么时候最像自己？",
        "有什么你还在学习如何开口去要求的事？",
        "你经历中有哪个部分塑造了现在的你，但很少被提起？",
        "对你来说，被某人真正理解意味着什么？",
        "有什么事是你希望自己能给自己更多认可的？",
        "有没有一个梦想，你已经悄悄守护了很久？",
        "你现在最想让好朋友了解你正在承受什么？",
      ],
    },
  },
  japanese: {
    lovers: {
      playful: [
        "私たちのどんな小さな出来事が、ずっと使える内輪ネタになりそう？",
        "もし急に一日だけロマンチックに逃げ出せるなら、どこへ行きたい？",
        "私のどんな小さな癖を見ると、つい笑顔になる？",
        "どんなデートなら気楽で、しかも忘れられないと思う？",
        "ちょっと照れるけど、私たちにぴったりな呼び名はある？",
        "私たちの関係が映画のジャンルなら、何になると思う？理由は？",
        "何を見ると、一番ランダムに私のことを思い出す？",
        "私たちにテーマソングがあるとしたら、何になる？",
        "私がやることで、意外とかわいいと思っていることはある？",
        "もしお互いの習慣をひとつ交換できるなら、何を選ぶ？",
        "一緒にやった一番おかしなことで、実は内心気に入っていたのはどれ？",
        "もし一緒にお店を開いたら、何という名前にする？",
        "私たちのリアリティ番組は、どんな内容になる？",
        "今すぐバケットリストに追加すべきことは何かある？",
        "私たちの関係の中で、もう一度経験したい瞬間はどれ？",
        "二人とも挑戦してみようと思う、一番奇妙な食べ物の組み合わせは？",
        "もし私たちが本の登場人物だったら、作者はどう描写すると思う？",
        "ずっと提案するのが恥ずかしかった冒険は何かある？",
        "私がやる小さなことで、普通の日を特別にしてくれるのはどんなこと？",
        "世界のどこかで魔法の一時間を過ごせるとしたら、どこへ行く？",
      ],
      deep: [
        "今の私たちの関係で、一番強いと感じる部分はどこ？",
        "私といる時、いつ一番心から安心できる？",
        "これから先も、二人で守り続けたいものは何？",
        "未来で一緒に迎えたい瞬間はどんなもの？",
        "私たちの関係から学んだ、愛についての本当のことは？",
        "自分自身について私に理解してほしいけど、言葉にしにくいことはある？",
        "私はあなたの自分への見方をどう変えた？",
        "「家」ってどんな感覚？そこに私はいる？",
        "私たちについて、まだ声に出していない不安はある？",
        "自分自身についてもっと認めてほしいと思うことは何？",
        "私が特別な人だと初めて気づいたのはいつ？",
        "誰かに本当にわかってもらうということは、あなたにとってどういう意味？",
        "気づかぬうちに、私たちが強くなった部分はどこ？",
        "私があなたを愛する姿を見て、愛について何を学んだ？",
        "これから来るつらい時期を、二人でどう乗り越えたい？",
        "私が手助けできる、あなたの夢は何？",
        "私がしてきた一番愛情深いことで、自分でも気づいていないものは何？",
        "一緒にいることの先にある「約束」とは、あなたにとって何を意味する？",
        "私の反応が怖くて、まだ言えていないことはある？",
        "何があっても、いつも立ち戻りたいと思う「あの一つ」は何？",
      ],
    },
    friends: {
      playful: [
        "私たちの友情が賞をもらうなら、何賞だと思う？",
        "今でも思い出すとすぐ笑ってしまう、私たちの変な思い出は？",
        "もし二人でとんでもない寄り道を始めるなら、どんな内容？",
        "私を思い出す曲、おやつ、場所といえば何？",
        "私たちらしい小さなトラブルってどんなもの？",
        "もし強盗映画のコンビなら、それぞれの役割は何？",
        "一緒にやった一番めちゃくちゃなことで、なぜかうまくいったのは？",
        "私たちの友情にマスコットがいるとしたら、何になる？",
        "私が勧めて試してみたことで、今はこっそり感謝していることは？",
        "一年間、一つの方法でしかコミュニケーションできないとしたら、何を選ぶ？",
        "計画して本当に実行した、一番とんでもないことは？",
        "もし二人でポッドキャストを始めたら、第一回のテーマは何？",
        "今すぐ始めるべき友情の恒例行事はある？",
        "食べ物で私たちの友情を表すなら、何を選ぶ？",
        "一緒にやった一番大げさで、必要なかったことは？",
        "もし友情がスポーツなら、私たちの得意技は何？",
        "私がまだ試していないことで、絶対ハマると思うものは？",
        "友情のドキュメンタリーを作るなら、どんな驚きの展開がある？",
        "私たちの最も印象的な共通の思い出は何だと思う？",
        "今でも笑える、私たちが言い合いになった一番くだらないことは？",
      ],
      deep: [
        "どんな会話をすると、友達と一番近く感じる？",
        "初対面の人に誤解されやすい自分の一面は？",
        "今の人生で一番大事だと感じているものは？",
        "仲のいい友達にもっと気づいてほしい自分の部分は？",
        "本当に安心できる友情って、どんなものだと思う？",
        "今経験していることで、あまり話せていないことはある？",
        "この一年で、自分自身について新たに気づいたことは？",
        "つらいとき、どんなサポートが本当に助けになる？",
        "あまり話さないけど、誇りに思っていることは何？",
        "友情における「誠実さ」とは、あなたにとってどういう意味？",
        "まだ自分でも模索中の、なりたい自分はある？",
        "ほとんど誰も知らない、あなたがやった一番勇敢なことは？",
        "時間をかけて大きく変わった考えや信念はある？",
        "一番自分らしいと感じるのはどんな時？",
        "まだ学んでいる最中の「お願いの仕方」はある？",
        "今の自分を作ったけど、あまり語られない人生の一部は何？",
        "誰かに本当に理解されるとはどういうことか、あなたにとっての意味は？",
        "もっと自分を認めてあげたいと思うことは何？",
        "ずっと静かに大切にしてきた夢はある？",
        "今、親友に知ってほしい、自分が抱えているものは何？",
      ],
    },
  },
  korean: {
    lovers: {
      playful: [
        "우리 사이의 어떤 사소한 일이 평생 가는 농담이 될 것 같아?",
        "갑자기 하루 동안 로맨틱하게 떠날 수 있다면 어디로 가고 싶어?",
        "내 어떤 작은 습관이 너를 몰래 웃게 만들어?",
        "어떤 데이트가 우리에게 편안하면서도 오래 기억될까?",
        "조금 부끄럽지만 우리에게 잘 어울리는 애칭이 있을까?",
        "우리의 관계가 영화 장르라면, 어떤 장르이고 왜 그럴까?",
        "가장 엉뚱한 것 중에 나를 바로 떠올리게 하는 건 뭐야?",
        "우리에게 테마송이 있다면 어떤 노래일까?",
        "내가 하는 행동 중에 의외로 귀엽다고 느끼는 게 있어?",
        "서로의 습관 하나씩 바꿀 수 있다면 어떤 걸 선택할 것 같아?",
        "우리가 함께 했던 가장 황당한 일 중에 사실 내심 좋았던 건 뭐야?",
        "함께 가게를 연다면 이름을 뭐라고 할 것 같아?",
        "우리의 리얼리티 TV 쇼는 어떤 내용일까?",
        "지금 당장 버킷 리스트에 추가해야 할 것이 있을까?",
        "우리 관계에서 한 순간을 다시 경험할 수 있다면 어떤 순간을 고를 것 같아?",
        "우리 둘 다 도전해볼 것 같은 가장 이상한 음식 조합은 뭐야?",
        "우리가 책 속 캐릭터라면 작가가 우리를 어떻게 묘사할까?",
        "지금까지 제안하기 너무 부끄러웠던 모험이 있어?",
        "내가 하는 어떤 작은 일이 평범한 하루를 특별하게 만들어줘?",
        "세계 어디에서든 마법 같은 한 시간을 보낼 수 있다면 어디로 갈 것 같아?",
      ],
      deep: [
        "지금 우리 관계에서 가장 단단하다고 느끼는 부분은 뭐야?",
        "나와 있을 때 언제 가장 정서적으로 안전하다고 느껴?",
        "우리가 앞으로도 꼭 지키고 싶은 것은 뭐야?",
        "나와 함께 가장 기대되는 미래의 순간은 뭐야?",
        "우리 관계를 통해 사랑에 대해 알게 된 진실은 뭐야?",
        "나에게 이해받고 싶지만 말로 표현하기 어려운 것이 있어?",
        "내가 너 자신을 바라보는 방식을 어떻게 바꿨어?",
        "'집'이 너에게 어떤 느낌인지, 내가 거기에 어떤 역할을 하고 있어?",
        "우리에 대한 두려움 중 아직 소리 내어 말하지 못한 게 있어?",
        "내가 나 자신에 대해 더 자주 인정했으면 하는 것이 있어?",
        "내가 너에게 정말 특별한 사람이라는 걸 처음 알았던 순간이 언제야?",
        "누군가에게 진정으로 알려진다는 것이 너에게 어떤 의미야?",
        "우리가 서로 모르는 사이에 더 강해진 부분이 어디일까?",
        "내가 너를 사랑하는 방식을 보면서 사랑에 대해 배운 것이 있어?",
        "앞으로 올 힘든 시간들을 우리가 어떻게 함께 이겨냈으면 좋겠어?",
        "내가 도와줄 수 있는 너의 꿈이 있어?",
        "내가 한 일 중에 나도 모르게 가장 다정했던 게 뭐야?",
        "함께 있는 것 이상으로 헌신이 너에게 어떤 의미야?",
        "내 반응이 무서워서 아직 말하지 못한 것이 있어?",
        "무슨 일이 있어도 항상 돌아오고 싶은 그 한 가지가 뭐야?",
      ],
    },
    friends: {
      playful: [
        "우리 우정이 상을 받는다면 어떤 상일까?",
        "지금 떠올려도 바로 웃게 되는 우리 사이의 랜덤한 추억은 뭐야?",
        "우리가 말도 안 되는 사이드 퀘스트를 시작한다면 뭐가 될까?",
        "나를 바로 떠올리게 하는 노래, 간식, 장소는 뭐야?",
        "우리답다고 느껴지는 작은 장난은 뭐가 있을까?",
        "우리가 강도 영화 속 듀오라면 각자의 역할이 뭐야?",
        "함께 했던 가장 혼란스러운 일인데 어떻게 잘 됐던 건 뭐야?",
        "우리 우정에 마스코트가 있다면 뭐가 될까?",
        "내가 권유해서 시도해봤는데 사실 마음속으로 감사하고 있는 게 뭐야?",
        "일 년 동안 한 가지 방법으로만 소통할 수 있다면 뭘 선택할 것 같아?",
        "계획하고 실제로 실행했던 가장 황당한 건 뭐야?",
        "우리가 팟캐스트를 한다면 첫 번째 에피소드는 무엇에 대한 이야기일까?",
        "지금 시작해야 할 우정의 전통이 있을까?",
        "우리 우정을 음식으로 표현한다면 뭘 고를 것 같아?",
        "우리가 함께 했던 가장 과장되고 불필요한 일은 뭐야?",
        "우정이 스포츠라면 우리의 시그니처 기술은 뭐야?",
        "내가 아직 시도해보지 않은 것 중에 너무 좋아할 것 같은 게 있어?",
        "우정에 관한 다큐멘터리를 만든다면 어떤 반전이 있을까?",
        "우리의 가장 상징적인 공유 기억은 뭐라고 생각해?",
        "지금도 웃기는, 우리가 다퉜던 가장 사소한 것이 뭐야?",
      ],
      deep: [
        "어떤 대화를 할 때 친구와 가장 가까워졌다고 느껴?",
        "사람들이 너를 처음 볼 때 자주 오해하는 점은 뭐야?",
        "지금 네 삶에서 가장 중요하게 느껴지는 부분은 뭐야?",
        "가까운 친구들이 네게 더 자주 알아봐 줬으면 하는 점은 뭐야?",
        "정말 안전하다고 느껴지는 우정은 어떤 모습이야?",
        "지금 겪고 있는 일 중에 많이 얘기하지 못한 게 있어?",
        "지난 한 해 동안 자신에 대해 새롭게 알게 된 것이 있어?",
        "힘들 때 어떤 종류의 지원이 실제로 도움이 돼?",
        "자랑스럽지만 거의 말하지 않는 것이 있어?",
        "우정에서 충성심이 너에게 어떤 의미야?",
        "아직 파악하고 있는 중인 너 자신의 또 다른 모습이 있어?",
        "거의 아무도 모르는, 네가 했던 가장 용감한 일은 뭐야?",
        "세월이 지나면서 많이 바뀐 생각이나 신념이 있어?",
        "가장 자신답다고 느끼는 순간은 언제야?",
        "아직 배우고 있는 것 중에 요청하는 방법이 있어?",
        "지금의 너를 만들었지만 자주 언급되지 않는 삶의 부분은 뭐야?",
        "누군가에게 진정으로 이해받는다는 것이 너에게 어떤 의미야?",
        "자신에 대해 더 많이 인정해줬으면 하는 것이 있어?",
        "오랫동안 조용히 간직해온 꿈이 있어?",
        "지금 친한 친구에게 네가 짊어지고 있는 것을 알아줬으면 하는 게 뭐야?",
      ],
    },
  },
};

const labels = {
  english: {
    lovers: "Lovers",   friends: "Friends", playful: "Playful", deep: "Serious / Deep", language: "English",
    settingsTitle: "Customize Card", typeLabel: "Type",    moodLabel: "Mood",      langLabel: "Language", save: "Save",
  },
  indonesian: {
    lovers: "Pasangan", friends: "Teman",   playful: "Santai",  deep: "Mendalam",       language: "Bahasa",
    settingsTitle: "Sesuaikan Kartu", typeLabel: "Tipe",   moodLabel: "Suasana",   langLabel: "Bahasa",   save: "Simpan",
  },
  chinese: {
    lovers: "恋人",     friends: "朋友",    playful: "轻松",    deep: "深入",            language: "中文",
    settingsTitle: "自定义卡片",      typeLabel: "类型",  moodLabel: "氛围",      langLabel: "语言",     save: "保存",
  },
  japanese: {
    lovers: "恋人",     friends: "友達",    playful: "気軽",    deep: "深い",            language: "日本語",
    settingsTitle: "カードをカスタマイズ", typeLabel: "タイプ", moodLabel: "雰囲気",   langLabel: "言語",     save: "保存",
  },
  korean: {
    lovers: "연인",     friends: "친구",    playful: "가볍게",  deep: "깊게",            language: "한국어",
    settingsTitle: "카드 설정",       typeLabel: "유형",  moodLabel: "분위기",    langLabel: "언어",     save: "저장",
  },
};

/* ── DOM ─────────────────────────────────────────────────────── */

const cardStack    = document.getElementById("card-stack");
const elActive     = document.getElementById("card-one");    // current      z-index: 2
const elNear       = document.getElementById("card-two");    // next +1       z-index: 1
const elFar        = document.getElementById("card-three");  // next +2       z-index: 0
const elPrev       = document.getElementById("card-prev");   // previous -1   z-index: 3 (always on top)

const categoryLabel  = document.getElementById("category-label");
const languageLabel  = document.getElementById("language-label");
const moodLabel      = document.getElementById("mood-label");
const settingsDialog = document.getElementById("settings-dialog");
const chipButtons    = Array.from(document.querySelectorAll(".chip"));

const elSettingsTitle = document.querySelector(".settings-title");
const elTypeLabel     = document.getElementById("type-label");
const elMoodLabelS    = document.getElementById("mood-label-settings");
const elLangLabelS    = document.getElementById("language-label-settings");
const elSaveBtn       = document.getElementById("settings-save");

function renderSettingsText(lang) {
  const L = labels[lang];
  elSettingsTitle.textContent = L.settingsTitle;
  elTypeLabel.textContent     = L.typeLabel;
  elMoodLabelS.textContent    = L.moodLabel;
  elLangLabelS.textContent    = L.langLabel;
  elSaveBtn.textContent       = L.save;
  chipButtons.forEach(b => {
    if (b.dataset.setting === "category" || b.dataset.setting === "mood") {
      b.textContent = L[b.dataset.value];
    }
  });
}

/* ── App state ───────────────────────────────────────────────── */

const S = {
  lang:  "english",
  cat:   "lovers",
  mood:  "playful",
  idx:   0,
  busy:  false,   // true while a swipe animation is in progress
  // drag tracking
  dragging: false,
  startX:   0,
  nowX:     0,
  rafId:    null,
};

const KEY = { category: "cat", language: "lang", mood: "mood" };

/* ── Helpers ─────────────────────────────────────────────────── */

function getDeck() { return decks[S.lang][S.cat][S.mood]; }
function wrapIdx(i) { const d = getDeck(); return (i + d.length) % d.length; }
function setTxt(el, text) { el.querySelector(".card-text").textContent = text; }

/* Animation constants — slower, smooth ease-out */
const EASING       = "cubic-bezier(0.25, 1, 0.5, 1)";
const SWIPE_MS     = 420;   // goPrev / snap-back
const SWIPE_NEXT_MS = 700;  // goNext — longer so exit feels as deliberate as entry
const SNAP_MS      = 300;   // snap-back animation
const DISSOLVE_MS  = 260;   // back-card fade in / fade out

function makeTr(ms) {
  return `transform ${ms}ms ${EASING}, opacity ${ms}ms ${EASING}`;
}

/* Apply styles in one shot. Pass null for transition to keep existing. */
function applyStyle(el, transform, opacity, transition) {
  if (transition !== null) el.style.transition = transition;
  el.style.transform = transform;
  el.style.opacity   = String(opacity);
}

/* Strip inline styles and restore CSS-class-driven positions */
function restoreAllToRest() {
  elActive.style.cssText = "";
  elNear.style.cssText   = "";
  elFar.style.cssText    = "";
  elPrev.style.cssText   = "";

  elActive.className = "question-card active-card";
  elNear.className   = "question-card preview-card preview-card-near";
  elFar.className    = "question-card preview-card preview-card-far";
  elPrev.className   = "question-card return-card";
}

/* ── Render ──────────────────────────────────────────────────── */

function setCounter(el, idx, total) {
  el.querySelector(".card-counter").textContent = `${idx + 1} / ${total}`;
}

function render() {
  const d = getDeck();
  setTxt(elActive, d[S.idx]);
  setTxt(elPrev,   d[wrapIdx(S.idx - 1)]);
  setTxt(elNear,   d[wrapIdx(S.idx + 1)]);
  setTxt(elFar,    d[wrapIdx(S.idx + 2)]);

  // Counter
  setCounter(elActive, S.idx, d.length);
  setCounter(elPrev,   wrapIdx(S.idx - 1), d.length);
  setCounter(elNear,   wrapIdx(S.idx + 1), d.length);
  setCounter(elFar,    wrapIdx(S.idx + 2), d.length);

  document.body.dataset.theme = S.cat;
  categoryLabel.textContent   = labels[S.lang][S.cat];
  languageLabel.textContent   = labels[S.lang].language;
  moodLabel.textContent       = labels[S.lang][S.mood];

  chipButtons.forEach(b => {
    b.classList.toggle("is-active", S[KEY[b.dataset.setting]] === b.dataset.value);
  });

  restoreAllToRest();
}

/* ── Swipe forward (← left) ──────────────────────────────────── */
/*
  Visually:  active flies out left, near rises to full, far rises to near.
  z-order:   active(2) flies away, near(1) becomes visible top card.
  Commit:    setTimeout — reliable unlike transitionend which silently
             misfires on elements with pointer-events:none or opacity:0.
*/
function goNext() {
  if (S.busy) return;
  S.busy = true;

  const T = makeTr(SWIPE_NEXT_MS);
  applyStyle(elActive, "translate3d(-110vw,0,0) rotate(-18deg)", 0, T);
  applyStyle(elNear,   "translate3d(0,0,0) scale(1)",            1, T);
  applyStyle(elFar,    "translate3d(0,18px,0) scale(0.965)",     1, T);

  const fromIdx = S.idx;
  setTimeout(() => {
    S.idx = wrapIdx(S.idx + 1);
    Tracker.swipeNext({ from: fromIdx, to: S.idx, method: S._lastInput || "keyboard" });
    Tracker.startCardTimer(S.idx);
    render();
    // Dissolve in the brand-new back card (was not visible before this swipe)
    elFar.style.transition = "none";
    elFar.style.opacity    = "0";
    void elFar.offsetHeight;
    elFar.style.transition = `opacity ${DISSOLVE_MS}ms ease`;
    elFar.style.opacity    = "1";
    S.busy = false;
  }, SWIPE_NEXT_MS + 30);
}

/* ── Swipe back (→ right) ────────────────────────────────────── */
/*
  Visually:  prev card returns from the left (where goNext threw it),
             sliding back in ON TOP of the current stack.
  z-order:   elPrev is z:3, always above elActive(z:2).
  This is the exact inverse of goNext — the card "comes back".
*/
function goPrev(fromDrag) {
  if (S.busy) return;
  S.busy = true;

  if (!fromDrag) {
    // Keyboard — start prev off-screen left (where goNext throws cards)
    elPrev.style.transition = "none";
    elPrev.style.zIndex     = "3";
    elPrev.style.transform  = "translate3d(-110vw,0,0) rotate(-18deg)";
    elPrev.style.opacity    = "1";
    void elPrev.offsetHeight;
  }

  const T = makeTr(SWIPE_MS);

  // Prev slides back in from the left to center
  applyStyle(elPrev, "translate3d(0,0,0) rotate(0deg)", 1, T);

  // Active recedes to near position (pushed back by returning card)
  applyStyle(elActive, "translate3d(0,18px,0) scale(0.965)", 1, T);

  // Near recedes to far position
  applyStyle(elNear, "translate3d(0,34px,0) scale(0.93)", 1, T);
  applyStyle(elFar,  "translate3d(0,34px,0) scale(0.93)", 1, T);

  const fromIdx = S.idx;
  setTimeout(() => {
    S.idx = wrapIdx(S.idx - 1);
    Tracker.swipePrev({ from: fromIdx, to: S.idx, method: S._lastInput || "keyboard" });
    Tracker.startCardTimer(S.idx);
    render();
    S.busy = false;
  }, SWIPE_MS + 30);
}

/* ── Snap back (drag released without enough distance) ───────── */

function snapBack() {
  const T = makeTr(SNAP_MS);
  applyStyle(elActive, "translate3d(0,0,0) rotate(0deg)",        1, T);
  applyStyle(elNear,   "translate3d(0,18px,0) scale(0.965)",     1, T);
  applyStyle(elFar,    "translate3d(0,34px,0) scale(0.93)",      1, T);
  applyStyle(elPrev,   "translate3d(-110vw,0,0) rotate(-18deg)", 0, T);

  setTimeout(restoreAllToRest, SNAP_MS + 30);
}

/* ── Drag (rAF-batched, no transitions while finger is down) ─── */

function dragFrame() {
  S.rafId = null;
  if (!S.dragging) return;

  const dx = S.nowX - S.startX;
  const p  = Math.min(Math.abs(dx) / 160, 1);
  const rot = (dx / 20).toFixed(2);

  // Active card follows finger exactly — no transition
  elActive.style.transform = `translate3d(${dx}px,0,0) rotate(${rot}deg)`;
  elActive.style.setProperty('--holo-angle', `${200 + (dx / window.innerWidth) * 30}deg`);

  if (dx < 0) {
    // Dragging LEFT → next card rises from behind
    elNear.style.transform = `translate3d(0,${(18 - p * 18).toFixed(1)}px,0) scale(${(0.965 + p * 0.035).toFixed(4)})`;
    elNear.style.opacity   = "1";
    elFar.style.transform  = `translate3d(0,${(34 - p * 16).toFixed(1)}px,0) scale(${(0.93 + p * 0.035).toFixed(4)})`;
    elFar.style.opacity    = "1";
    // Keep prev off-screen left
    elPrev.style.transform = "translate3d(-110vw,0,0) rotate(-18deg)";
    elPrev.style.opacity   = "0";
  } else {
    // Dragging RIGHT → prev card returns from the left (inverse of discard)
    const offscreen = window.innerWidth * 1.1;
    const prevX = (-offscreen + p * offscreen).toFixed(1);
    const prevRot = (-18 + p * 18).toFixed(2);
    elPrev.style.zIndex    = "3";
    elPrev.style.transform = `translate3d(${prevX}px,0,0) rotate(${prevRot}deg)`;
    elPrev.style.opacity   = p.toFixed(3);
    // Near shifts down toward far position
    elNear.style.transform = `translate3d(0,${(18 + p * 16).toFixed(1)}px,0) scale(${(0.965 - p * 0.035).toFixed(4)})`;
    elNear.style.opacity   = "1";
    // Far stays at rest
    elFar.style.transform  = "translate3d(0,34px,0) scale(0.93)";
    elFar.style.opacity    = "1";
  }
}

function scheduleFrame() {
  if (S.rafId === null) S.rafId = requestAnimationFrame(dragFrame);
}

/* Remove any CSS transitions so the card tracks the finger with zero lag */
function killTransitions() {
  elActive.style.transition = "none";
  elNear.style.transition   = "none";
  elFar.style.transition    = "none";
  elPrev.style.transition   = "none";
}

/* ── Pointer events ──────────────────────────────────────────── */

cardStack.addEventListener("pointerdown", (e) => {
  if (S.busy || S.dragging) return;
  // Only start drag when the touch begins on the active front card
  if (!elActive.contains(e.target) && e.target !== elActive) return;

  S.dragging = true;
  S.startX   = e.clientX;
  S.nowX     = e.clientX;
  S._lastInput = "drag";

  Tracker.dragStart({ cardIdx: S.idx, startX: e.clientX });
  killTransitions();

  // Pre-position prev off-screen left for potential right-drag
  elPrev.style.zIndex    = "3";
  elPrev.style.transform = "translate3d(-110vw,0,0) rotate(-18deg)";
  elPrev.style.opacity   = "0";

  elActive.classList.add("dragging");
  elActive.setPointerCapture(e.pointerId);
}, { passive: true });

cardStack.addEventListener("pointermove", (e) => {
  if (!S.dragging) return;
  S.nowX = e.clientX;
  scheduleFrame();
}, { passive: true });

function finishDrag(releaseX) {
  if (!S.dragging) return;
  S.dragging = false;

  if (S.rafId !== null) {
    cancelAnimationFrame(S.rafId);
    S.rafId = null;
  }

  elActive.classList.remove("dragging");

  const dx = releaseX - S.startX;
  if (dx <= -80) {
    Tracker.dragComplete({ direction: "left", distance: Math.abs(dx) });
    goNext();
  } else if (dx >= 80) {
    Tracker.dragComplete({ direction: "right", distance: dx });
    goPrev(true);
  } else {
    Tracker.dragCancel({ distance: Math.abs(dx) });
    snapBack();
  }
}

cardStack.addEventListener("pointerup",     (e) => finishDrag(e.clientX));
cardStack.addEventListener("pointercancel", ()  => finishDrag(S.startX));  // snap back on cancel

/* ── Keyboard (→ next question, ← previous question) ────────── */

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") { S._lastInput = "keyboard"; goNext(); }
  if (e.key === "ArrowLeft")  { S._lastInput = "keyboard"; goPrev(); }
});

/* ── Settings dialog ─────────────────────────────────────────── */

// Pending state — holds unsaved selections while the modal is open
const pending = { cat: S.cat, lang: S.lang, mood: S.mood };

function syncChipUI() {
  chipButtons.forEach(b => {
    b.classList.toggle("is-active", pending[KEY[b.dataset.setting]] === b.dataset.value);
  });
}

document.getElementById("settings-trigger").addEventListener("click", () => {
  // Reset pending to current state each time modal opens
  pending.cat  = S.cat;
  pending.lang = S.lang;
  pending.mood = S.mood;
  syncChipUI();
  renderSettingsText(pending.lang);
  Tracker.settingsOpened();
  settingsDialog.showModal();
});

chipButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    pending[KEY[btn.dataset.setting]] = btn.dataset.value;
    syncChipUI();
    if (btn.dataset.setting === "language") renderSettingsText(pending.lang);
  });
});

document.getElementById("settings-save").addEventListener("click", () => {
  const changed = S.cat !== pending.cat || S.lang !== pending.lang || S.mood !== pending.mood;
  S.cat  = pending.cat;
  S.lang = pending.lang;
  S.mood = pending.mood;
  if (changed) S.idx = 0;
  Tracker.settingsSaved({ category: S.cat, mood: S.mood, language: S.lang, changed });
  if (changed) Tracker.startCardTimer(S.idx);
  render();
  settingsDialog.close();
});

/* ── Test mode indicator + toggle shortcut ───────────────────── */

if (Tracker.getMode() === "test") {
  document.getElementById("test-badge").hidden = false;
}

document.addEventListener("keydown", (e) => {
  // Ctrl+Shift+T (or Cmd+Shift+T on Mac) toggles test/live mode
  if (e.shiftKey && (e.ctrlKey || e.metaKey) && e.key === "T") {
    e.preventDefault();
    const next = Tracker.getMode() === "test" ? "live" : "test";
    Tracker.setMode(next);
    location.reload();
  }
});

/* ── Intro animation (cards stack in on load) ────────────────── */
/*
  Three-card cascade: far enters first, near follows, active lands on top.
  Uses an overshoot spring so each card bounces slightly into place.
  S.busy is held true for the full duration so no swipes interrupt.
*/
function playIntro() {
  S.busy = true;

  const SPRING = "cubic-bezier(0.34, 1.4, 0.64, 1)";
  const ease   = (ms) => `transform ${ms}ms ${SPRING}, opacity ${ms}ms ease`;

  // Park all three visible cards below the stack (off-screen bottom)
  elFar.style.cssText    = "transition:none; transform:translate3d(0,80%,0) scale(0.93); opacity:0;";
  elNear.style.cssText   = "transition:none; transform:translate3d(0,80%,0) scale(0.965); opacity:0;";
  elActive.style.cssText = "transition:none; transform:translate3d(0,80%,0); opacity:0;";
  // Force reflow — ensures the browser "sees" the starting positions
  // before any transition is applied (prevents jump-to-end)
  void elActive.offsetHeight;

  // Far card drifts up first (back of the stack)
  setTimeout(() => {
    elFar.style.transition = ease(520);
    elFar.style.transform  = "translate3d(0,34px,0) scale(0.93)";
    elFar.style.opacity    = "1";
  }, 60);

  // Near card follows close behind
  setTimeout(() => {
    elNear.style.transition = ease(540);
    elNear.style.transform  = "translate3d(0,18px,0) scale(0.965)";
    elNear.style.opacity    = "1";
  }, 200);

  // Active card lands on top with the strongest spring
  setTimeout(() => {
    elActive.style.transition = ease(580);
    elActive.style.transform  = "translate3d(0,0,0) rotate(0deg)";
    elActive.style.opacity    = "1";
  }, 340);

  // Hand back control once the active card has finished
  setTimeout(() => {
    restoreAllToRest();
    S.busy = false;
  }, 1020);
}

/* ── Init ────────────────────────────────────────────────────── */

render();
playIntro();
Tracker.startCardTimer(S.idx);
