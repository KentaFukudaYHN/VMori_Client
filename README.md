# サイト名 Vtuberの森
Vtuber専門の動画サイトです ※こちらは就職活動用にポートフォリオとして公開しています<br>
<br>
Youtube上では他のYoutuberの動画によって、Vtuberの動画が探しにくい状況でしたので、専用のサイトを作ってみました<br>
 
# デモ
動画での説明です<br>
 https://youtu.be/BFMxrGrhqQA
 
# 機能
・Youtubeの動画を簡単にアップロード<br>
・ジャンルやタグ等で細かく検索<br>
・ニコニコ動画の様にコメントを流す(※ニコニコ動画の著作権に引っかからない事を確認しています)<br>
・アカウント機能<br>
・Vtuberファンの方同士で交流できるSNS(※未実装)
 
# 構成
 
vue3 + typescriptをwebpackを使ってSPAを最小構成で構築しています<br>
※vue-cliは使用していません
 
# アーキテクチャ
 バックエンドとフロントエンドでプロジェクトを完全に分けています<br>
 バックエンド：https://github.com/KentaFukudaYHN/VMori_Server ※C# ASP.NET <br>
 <br>

### フロントのコード構成
大きくcore、dataAccess、front、routerにフォルダを分けています<br>
※開始当初から試行錯誤してアーキテクチャを決めた為、一部アーキテクチャから逸脱した実装をしています(ログイン処理をAccountPageに直接書く等)
<br>
![image](https://user-images.githubusercontent.com/43101670/156493548-e7cca90a-2917-4a2f-829a-53430da19511.PNG)
<br>
### アーキテクチャ構成図
![image](https://user-images.githubusercontent.com/43101670/156501507-8121909e-4e84-4056-b755-c32703173d49.png)
<br>
以下に各フォルダの役割を説明します<br>

## core

#### 概要
coreではビジネスロジックを定義します<br>

#### 構成
・services<br>
・serviceReqRes <br>
・apiReqRes<br>

#### services
ページに依存しない共通処理、ビジネスロジックをここに書きます<br>
逆にページに依存する処理は後述するpageServecesに書きます<br>

#### serviceReqRes
serviceの引数や返り値を定義したクラスになります<br>
このクラスはpageServiceとservice間でのデータの受け渡しに使用します<br>

#### apiReqRes
apiと通信する際のリクエスト、レスポンスを定義したクラスになります<br>
このクラスはサーバーとservice間でのデータの受け渡しに使用します<br>

## dataAccess

#### 概要
dataAccessではデータアクセス実装を書きます<br>

#### 構成
・repository<br>
・store <br>
・entities<br>

#### repository
外部リソースとのデータのやり取りをするクラスを定義します<br>
現在はサーバーとやり取りするrepositoryクラスのみ定義されています<br>

#### store
vuexに関するクラスをここに定義します<br>

#### entities
vuexの引数や返り値を定義したクラスになります<br>

## front
frontでは画面に関する処理を書きます<br>

#### 構成
・pages<br>
・pageServices <br>
・components<br>
・componentReqRes<br>
・valid<br>
・shareLayout<br>

#### pages
vueのテンプレートをここに書きます<br>
ロジックとviewを分ける為、ページに関する処理はここには書かず、後述するpageServiceに書きます

#### pageServices
ページごとの処理をここに書きます<br>
ページごとの処理とビジネスロジック(serviceクラス)を分けることで<br>
seriveceクラスは汎用的に実装することができます<br>

#### components
使いまわす、また使いまわしそうなUIをコンポーネントで書きます<br>

#### valid
バリデーションルールをここに書きます<br>

#### shareLayout
ページの共有部分を定義したlayoutクラスをここに書きます
