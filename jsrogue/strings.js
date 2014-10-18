var MSG_NONE = -1;
var MSG_NO_WALK  = 0;
var MSG_LANGUAGE = 1;
var MSG_CURRENTLANGUAGE = 2;
var MSG_RETURNTOINDEX = 3;
var MSG_OPPOSITELANGUAGE = 4;
var MSG_FAIL_DOGROUND = 5;
var MSG_CLIMB = 6;
var MSG_INTRO = 7;
var MSG_SEEKER = 8;
var MSG_PLAYER = 9;

var MessageLanguage = {
	ENGLISH:0,
	JAPANESE:1
}

var MessageStrings = {
	language:MessageLanguage.ENGLISH
}

var E_INTRO =
"\
<p>'Endless Tower', scholars are quick to point out, is a crude rendering \
from the Seekers' long dead language. \
A better translation, they say, would be 'Tower to the Endless'. \
</p><p>\
Nevertheless, no one has ever reached the top.</p>\
";
var J_INTRO =
"\
<p>「シーカーの古い死語から『エンドレスなタワー』は雑な翻訳だよ」と学者が早く言います。\
より良い翻訳は、「終焉へのタワー」だというのです。\
</p><p>\
しかし、誰一人タワーの頂上に到達した者はいません。</p>\
";

var E_SEEKER =
"\
<p>Robed in white, face shrouded. It shuffles towards you. \
This is a Seeker. Like you they sought answers. Now they are \
mere thralls to the tower, and see you as an infection to be purged.</p>\
";
var J_SEEKER =
"\
<p>顔まで覆われたローブを着た人が近づいてきりました。\
これはシーカーです。あなたごとき、答えを探しました。\
今タワーに捕らわれます。シーカーが感染とする。</p>\
";

MessageStrings.toggleLanguage = function() {
	if (this.language === MessageLanguage.ENGLISH) {
		this.language = MessageLanguage.JAPANESE;
	} else {
		this.language = MessageLanguage.ENGLISH;
	}
}

MessageStrings.drawOptions = function() {
	document.getElementById("langbutton").innerHTML = this.get(MSG_OPPOSITELANGUAGE);
	document.getElementById("return").innerHTML = this.get(MSG_RETURNTOINDEX);
}

MessageStrings.get = function(id) {
	var l = this.language;
	var e = MessageLanguage.ENGLISH;
	var j = MessageLanguage.JAPANESE;
	switch (id) {
	case MSG_NO_WALK: return ((l == e) ? "You cannot walk there." : "あなたはそこに歩けない。");
	case MSG_LANGUAGE: return (l == e) ? "Language" : "言語";
	case MSG_CURRENTLANGUAGE: return (l == j) ? "日本語" : "English";
	case MSG_OPPOSITELANGUAGE: return (l == j) ? "English" : "日本語";
	case MSG_RETURNTOINDEX: return (l == e) ? "Return to index." : "インデックスへ戻る。";
	case MSG_FAIL_DOGROUND: return (l == e) ? "There's nothing here." : "ここにない。";
	case MSG_CLIMB: return (l == e) ? "You climb the stairs." : "あなたは階段に上る。"
	case MSG_INTRO: return (l == e) ? E_INTRO : J_INTRO;
	case MSG_SEEKER: return (l == e) ? E_SEEKER : J_SEEKER;
	case MSG_PLAYER: return (l == e) ? "Who are you?" : "あなたは誰ですか?";
	}
}

MessageStrings.getStatus = function(floor) {
	switch (this.language) {
	case MessageLanguage.ENGLISH:  return '<span class="unit">Floor</span>: ' + ((floor == 0) ? "G" : floor);
	case MessageLanguage.JAPANESE: return (floor + 1) + '<span class="unit">階</span>';
	}
}
