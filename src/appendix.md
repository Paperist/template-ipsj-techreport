# 付録の書き方

付録がある場合には，参考文献リストの直後にコマンド `\appendix` に引き続いて書く．
付録では，`\section` コマンドが**A.1**，**A.2**などの見出しを生成する．

## 見出しの例

付録の `\subsetion` ではこのよう見出しになる．

# 研究会用コマンド {#sec:sig}

各研究会論文誌（トランザクション）には各々に固有のサブタイトル，略称，通番がある．最終原稿では，以下のコマンドを `\documentclass` の**オプション**とすることで，これらの情報を与える[^TBIO-SLDM-CVA]．

- `PRO`（プログラミング）
- `TOM`（数理モデル化と応用）
- `TOD`（データベース）
- `ACS`（コンピューティングシステム）
- `CDS`（コンシューマ・デバイス&システム）
- `TBIO`（Bioinformatics）
- `SLDM`（System LSI Design Methodology）
- `CVA`（Computer Vision and Applicaitons）

[^TBIO-SLDM-CVA]: TBIO, SLDM, CVAは英文論文誌であるので和名はない．

また英文論文作成の際には `english` をオプションに追加すればよい．したがって，`\documentclass[PRO]{ipsj}` とすれば「プログラミング」の和文用，
`\documentclass[PRO,english]{ipsj}` とすれば英文用となる．

また研究会には「号」と連動しない「発行月」があるため，学会あるいは編集委員会の指示に基づき，発行月を

```
\setcounter{月数}{<発行月>}
```

\noindent
によって指定する．

この他，以下の各節で示すように，いくつかの論文誌に固有の機能を実現するためのコマンドなどが用意されている．

# 各分冊固有コマンド

各分冊によってそれぞれ細かい仕様が違うため，同じコマンドでも出力結果が異なる場合がある．また「再受付」，「再々受付」が入る場合があり，それらは

\noindent
和文では

```
\再受付{<年>}{<月>}{<日>}
\再再受付{<年>}{<月>}{<日>}
```

\noindent
英文では

```
\rereceived{<年>}{<月>}{<日>}
\rerereceived{<年>}{<月>}{<日>}
```

\noindent
とプリアンブルに追加する．

## 「プログラミング（PRO）」固有機能

「論文誌：プログラミング」には論文以外に，プログラミング研究会での研究発表の内容梗概が含まれている．
この内容梗概は， `\documentclass` のオプションとして `abstract` を指定する．
[@sec:config]節の `\maketitle` までの内容からなるファイル（すなわち本文がないファイル）から生成する．
なお `\受付` や `\採録` は不要であるが，代わりに発表年月日を，

\noindent
和文では

```
\発表{<年>}{<月>}{<日>}
```

\noindent
英文では

```
\Presents{<年>}{<月>}{<日>}
```

\noindent
により指定する．

## 「データベース（TOD）」固有機能

「論文誌：データベース」の論文の担当編集委員は，

```
\Editor{<氏名>}
```

\noindent
により指定する．和文では「担当編集委員」，英文では「Editor in Charge:」と入る．

またスタイルの変更に伴い， **本文の最後** に入るので，
`\end{document}` の前に直接置く．

## 「コンシューマ・デバイス&システム（CDS）」固有機能

「論文誌：コンシューマ・デバイス&システム」では，
論文の種類によって見出しが変わるため，オプションで切替えを行う．

各種別は

- `systems` : コンシューマ・システム論文 (Paper on Consumer Systems)
- `services` : コンシューマ・サービス論文 (Paper on Consumer Services)
- `devices` : コンシューマ・デバイス論文 (Paper on Consumer Devices)
- `research` : 研究論文 (Research Paper)

\noindent
となる．

和文のコンシューマ・システム論文なら，
`\documentclass[CDS,systems]{ipsj}`となり，
英文原稿なら `english` を追加すればよい．

## 「Bioinformatics（TBIO）」固有機能

Trans. Bioinformatics (TBIO)は英文論文誌であるので，
`TBIO` オプションの指定によって自動的に `english` オプションが
指定されたものとみなされ， `english` オプションの省略が可能．

論文種別は以下の3種．

- 指定なし : Original Paper (Default)
- Data : Database/Software Paper
- Survey : Survey Paper

`\documentclass[TBIO]{ipsj}` でOriginal Paper，
`\documentclass[TBIO,Survey]{ipsj}` でSurvey Paperとなる．

また，担当編集委員はTOD同様， `\Editor` で定義するが，「Communicated by」となる．
TOD同様， `\end{document}` の前に直接置く．

## 「Computer Vision and Applicaitons（CVA）」固有機能

Trans. CVAも英文論文誌であるため， `english` オプションの省略が可．

論文種別は3種類あり，

- 指定なし : Regular Paper (Default)
- `Research` : Research Paper
- `system` : Systems Paper

\noindent
となる．

TBIO同様，担当編集委員が入り，挿入文章もTBIO同様，「Communicated by」となる．

## 「System LSI Design Methodology（SLDM）」固有機能

Trans. SLDMも英文論文誌であるため， `english` オプションの省略が可．

論文種別は2種類あり，

- 指定なし : Regular Paper (Default)
- `Short` : Short Paper

\noindent
となる．

SLDMも担当編集委員が入るが挿入文章が論文によって自動挿入文章が異なる．

通常は「Recommended by Associate Editor:」，
`invited` のオプションが入った場合のみ，「Invited by Editor-in-Chief:」となる．
