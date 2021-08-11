## 環境情報
- MacBook Air (13-inch, Early 2015)
- プロセッサ：1.6 GHz デュアルコアIntel Core i5
- メモリ：8 GB 1600 MHz DDR3

で、https://github.com/mcollina/autocannon を利用した。
全てhttpでリクエストした。

## ベンチマーク総評
- hyperのサンプルと比較して、相当に遅い（以下のデータではそんなに遅くないように見えるが、リクエスト数がダントツに違う）。
- 負荷を少しでも増やすと、まあまあな数のリクエストがタイムアウトする。
- 小さなサービスには利用できるレベル。

## 詳細

### APack
デフォルト
```
> autocannon -m GET -H AUTHORIZATION-APACK=e7a6059c1c1c0f38e3ff1a8b7153cabcc47a1fc4fad5ea0ad5ede18w http://localhost:3000/897dc182a5184d1edb259e560144927b38abe9e6c04bea46eab29786cddfd7b2/message/list/a
Running 10s test @ http://localhost:3000/897dc182a5184d1edb259e560144927b38abe9e6c04bea46eab29786cddfd7b2/message/list/a
10 connections

┌─────────┬───────┬────────┬────────┬────────┬───────────┬─────────┬────────┐
│ Stat    │ 2.5%  │ 50%    │ 97.5%  │ 99%    │ Avg       │ Stdev   │ Max    │
├─────────┼───────┼────────┼────────┼────────┼───────────┼─────────┼────────┤
│ Latency │ 65 ms │ 180 ms │ 467 ms │ 531 ms │ 193.47 ms │ 93.8 ms │ 729 ms │
└─────────┴───────┴────────┴────────┴────────┴───────────┴─────────┴────────┘
┌───────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%   │ Avg     │ Stdev   │ Min     │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Req/Sec   │ 33      │ 33      │ 56      │ 59      │ 50.6    │ 8.77    │ 33      │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Bytes/Sec │ 8.68 kB │ 8.68 kB │ 14.7 kB │ 15.5 kB │ 13.3 kB │ 2.31 kB │ 8.68 kB │
└───────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┘

Req/Bytes counts sampled once per second.

516 requests in 10.05s, 133 kB read
```
８スレッド２００コネクション（GMO ALTAS）で60秒
```
> autocannon -m GET -H AUTHORIZATION-APACK=30bb58e8f1972543b6129e4c7d76b13ea670b189eb436e6a5884c951 -c 200 -w 8 -d 60 https://153.122.73.177/897dc182a5184d1edb259e560144927b38abe9e6c04bea46eab29786cddfd7b2/message/list/a

Running 60s test @ https://153.122.73.177/897dc182a5184d1edb259e560144927b38abe9e6c04bea46eab29786cddfd7b2/message/list/a
200 connections
8 workers

┌─────────┬────────┬────────┬─────────┬─────────┬────────────┬────────────┬──────────┐
│ Stat    │ 2.5%   │ 50%    │ 97.5%   │ 99%     │ Avg        │ Stdev      │ Max      │
├─────────┼────────┼────────┼─────────┼─────────┼────────────┼────────────┼──────────┤
│ Latency │ 228 ms │ 697 ms │ 8139 ms │ 9203 ms │ 1689.66 ms │ 2189.39 ms │ 11084 ms │
└─────────┴────────┴────────┴─────────┴─────────┴────────────┴────────────┴──────────┘
┌───────────┬─────────┬─────────┬───────┬────────┬─────────┬─────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%   │ 97.5%  │ Avg     │ Stdev   │ Min     │
├───────────┼─────────┼─────────┼───────┼────────┼─────────┼─────────┼─────────┤
│ Req/Sec   │ 9       │ 10      │ 37    │ 354    │ 99.74   │ 127.19  │ 9       │
├───────────┼─────────┼─────────┼───────┼────────┼─────────┼─────────┼─────────┤
│ Bytes/Sec │ 3.65 kB │ 4.05 kB │ 15 kB │ 131 kB │ 37.7 kB │ 46.7 kB │ 3.65 kB │
└───────────┴─────────┴─────────┴───────┴────────┴─────────┴─────────┴─────────┘

Req/Bytes counts sampled once per second.

6k requests in 60.25s, 2.26 MB read
194 errors (194 timeouts)
```

１０スレッド２５０コネクション
```
> autocannon -c 250  -w 10 -m GET -H AUTHORIZATION-APACK=e7a6059c1c1c0f38e3ff1a8b7153cabcc47a1fc4fad5ea0ad5ede18w http://localhost:3000/897dc182a5184d1edb259e560144927b38abe9e6c04bea46eab29786cddfd7b2/message/list/a

Running 10s test @ http://localhost:3000/897dc182a5184d1edb259e560144927b38abe9e6c04bea46eab29786cddfd7b2/message/list/a
250 connections
10 workers

┌─────────┬────────┬────────┬─────────┬─────────┬───────────┬───────────┬─────────┐
│ Stat    │ 2.5%   │ 50%    │ 97.5%   │ 99%     │ Avg       │ Stdev     │ Max     │
├─────────┼────────┼────────┼─────────┼─────────┼───────────┼───────────┼─────────┤
│ Latency │ 170 ms │ 286 ms │ 1629 ms │ 4407 ms │ 409.26 ms │ 758.63 ms │ 9787 ms │
└─────────┴────────┴────────┴─────────┴─────────┴───────────┴───────────┴─────────┘
┌───────────┬───────┬───────┬─────────┬─────────┬─────────┬─────────┬───────┐
│ Stat      │ 1%    │ 2.5%  │ 50%     │ 97.5%   │ Avg     │ Stdev   │ Min   │
├───────────┼───────┼───────┼─────────┼─────────┼─────────┼─────────┼───────┤
│ Req/Sec   │ 42    │ 42    │ 267     │ 299     │ 241.2   │ 78.68   │ 42    │
├───────────┼───────┼───────┼─────────┼─────────┼─────────┼─────────┼───────┤
│ Bytes/Sec │ 11 kB │ 11 kB │ 70.8 kB │ 79.3 kB │ 63.9 kB │ 20.9 kB │ 11 kB │
└───────────┴───────┴───────┴─────────┴─────────┴─────────┴─────────┴───────┘

Req/Bytes counts sampled once per second.

3k requests in 10.06s, 639 kB read
112 errors (104 timeouts)
```

今朝、同じパラメータでベンチマークをとると、結果が異なっていた。
上では3kだったが、下では1kのrequestsが行われている。
```
> autocannon -c 250  -w 10 -m GET -H AUTHORIZATION-APACK=e7a6059c1c1c0f38e3ff1a8b7153cabcc47a1fc4fad5ea0ad5ede18w 
http://localhost:3000/897dc182a5184d1edb259e560144927b38abe9e6c04bea46eab29786cddfd7b2/message/list/a

Running 10s test @ http://localhost:3000/897dc182a5184d1edb259e560144927b38abe9e6c04bea46eab29786cddfd7b2/message/list/a
250 connections
10 workers

┌─────────┬────────┬─────────┬─────────┬─────────┬────────────┬───────────┬─────────┐
│ Stat    │ 2.5%   │ 50%     │ 97.5%   │ 99%     │ Avg        │ Stdev     │ Max     │
├─────────┼────────┼─────────┼─────────┼─────────┼────────────┼───────────┼─────────┤
│ Latency │ 231 ms │ 1820 ms │ 4753 ms │ 5016 ms │ 2073.77 ms │ 1201.7 ms │ 6274 ms │
└─────────┴────────┴─────────┴─────────┴─────────┴────────────┴───────────┴─────────┘
┌───────────┬─────┬──────┬─────────┬─────────┬─────────┬─────────┬─────────┐
│ Stat      │ 1%  │ 2.5% │ 50%     │ 97.5%   │ Avg     │ Stdev   │ Min     │
├───────────┼─────┼──────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Req/Sec   │ 0   │ 0    │ 99      │ 119     │ 87.6    │ 36.55   │ 45      │
├───────────┼─────┼──────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Bytes/Sec │ 0 B │ 0 B  │ 26.2 kB │ 31.5 kB │ 23.2 kB │ 9.68 kB │ 11.9 kB │
└───────────┴─────┴──────┴─────────┴─────────┴─────────┴─────────┴─────────┘

Req/Bytes counts sampled once per second.

1k requests in 10.05s, 232 kB read
```
60秒の指定をつけるとこんな感じ（GMO ALTAS）。
```
> autocannon -m GET -H AUTHORIZATION-APACK=30bb58e8f1972543b6129e4c7d76b13ea670b189eb436e6a5884c951 -c 250 -w 10 -d 60 https://153.122.73.177/897dc182a5184d1edb259e560144927b38abe9e6c04bea46eab29786cddfd7b2/message/list/a

Running 60s test @ https://153.122.73.177/897dc182a5184d1edb259e560144927b38abe9e6c04bea46eab29786cddfd7b2/message/list/a
250 connections
10 workers

┌─────────┬────────┬────────┬─────────┬─────────┬────────────┬────────────┬──────────┐
│ Stat    │ 2.5%   │ 50%    │ 97.5%   │ 99%     │ Avg        │ Stdev      │ Max      │
├─────────┼────────┼────────┼─────────┼─────────┼────────────┼────────────┼──────────┤
│ Latency │ 237 ms │ 932 ms │ 8534 ms │ 9380 ms │ 1963.06 ms │ 2318.25 ms │ 13512 ms │
└─────────┴────────┴────────┴─────────┴─────────┴────────────┴────────────┴──────────┘
┌───────────┬─────────┬─────────┬─────────┬────────┬─────────┬─────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%  │ Avg     │ Stdev   │ Min     │
├───────────┼─────────┼─────────┼─────────┼────────┼─────────┼─────────┼─────────┤
│ Req/Sec   │ 6       │ 7       │ 27      │ 344    │ 91.09   │ 122.21  │ 6       │
├───────────┼─────────┼─────────┼─────────┼────────┼─────────┼─────────┼─────────┤
│ Bytes/Sec │ 2.43 kB │ 2.84 kB │ 10.9 kB │ 127 kB │ 34.4 kB │ 44.9 kB │ 2.43 kB │
└───────────┴─────────┴─────────┴─────────┴────────┴─────────┴─────────┴─────────┘

Req/Bytes counts sampled once per second.

6k requests in 60.26s, 2.06 MB read
446 errors (446 timeouts)
```

１５スレッド４００コネクション
```
> autocannon -c 400  -w 15 -m GET -H AUTHORIZATION-APACK=e7a6059c1c1c0f38e3ff1a8b7153cabcc47a1fc4fad5ea0ad5ede18w http://localhost:3000/897dc182a5184d1edb259e560144927b38abe9e6c04bea46eab29786cddfd7b2/message/list/a

Running 10s test @ http://localhost:3000/897dc182a5184d1edb259e560144927b38abe9e6c04bea46eab29786cddfd7b2/message/list/a
400 connections
15 workers

┌─────────┬────────┬─────────┬─────────┬─────────┬────────────┬────────────┬──────────┐
│ Stat    │ 2.5%   │ 50%     │ 97.5%   │ 99%     │ Avg        │ Stdev      │ Max      │
├─────────┼────────┼─────────┼─────────┼─────────┼────────────┼────────────┼──────────┤
│ Latency │ 411 ms │ 3651 ms │ 9486 ms │ 9823 ms │ 4035.53 ms │ 2467.17 ms │ 10000 ms │
└─────────┴────────┴─────────┴─────────┴─────────┴────────────┴────────────┴──────────┘
┌───────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%   │ Avg     │ Stdev   │ Min     │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Req/Sec   │ 20      │ 20      │ 45      │ 59      │ 43.8    │ 10.89   │ 20      │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Bytes/Sec │ 5.26 kB │ 5.26 kB │ 11.8 kB │ 15.5 kB │ 11.5 kB │ 2.86 kB │ 5.26 kB │
└───────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┘

Req/Bytes counts sampled once per second.

931 requests in 10.24s, 115 kB read
103 errors (101 timeouts)

```
### hyperのexample
https://github.com/hyperium/hyper/blob/master/examples/params.rs

デフォルト
```
> autocannon -m GET http://127.0.0.1:1337

Running 10s test @ http://127.0.0.1:1337
10 connections

┌─────────┬──────┬──────┬───────┬──────┬─────────┬─────────┬───────┐
│ Stat    │ 2.5% │ 50%  │ 97.5% │ 99%  │ Avg     │ Stdev   │ Max   │
├─────────┼──────┼──────┼───────┼──────┼─────────┼─────────┼───────┤
│ Latency │ 0 ms │ 1 ms │ 3 ms  │ 4 ms │ 0.82 ms │ 1.57 ms │ 95 ms │
└─────────┴──────┴──────┴───────┴──────┴─────────┴─────────┴───────┘
┌───────────┬────────┬────────┬────────┬─────────┬─────────┬─────────┬────────┐
│ Stat      │ 1%     │ 2.5%   │ 50%    │ 97.5%   │ Avg     │ Stdev   │ Min    │
├───────────┼────────┼────────┼────────┼─────────┼─────────┼─────────┼────────┤
│ Req/Sec   │ 4055   │ 4055   │ 7771   │ 9663    │ 7550.5  │ 1707.06 │ 4055   │
├───────────┼────────┼────────┼────────┼─────────┼─────────┼─────────┼────────┤
│ Bytes/Sec │ 990 kB │ 990 kB │ 1.9 MB │ 2.36 MB │ 1.84 MB │ 416 kB  │ 989 kB │
└───────────┴────────┴────────┴────────┴─────────┴─────────┴─────────┴────────┘

Req/Bytes counts sampled once per second.

76k requests in 10.02s, 18.4 MB read
```

１０スレッド２５０コネクション
```
> autocannon -c 250 -w 10 -m GET http://127.0.0.1:1337
Running 10s test @ http://127.0.0.1:1337
250 connections
10 workers

┌─────────┬──────┬───────┬────────┬────────┬──────────┬─────────┬────────┐
│ Stat    │ 2.5% │ 50%   │ 97.5%  │ 99%    │ Avg      │ Stdev   │ Max    │
├─────────┼──────┼───────┼────────┼────────┼──────────┼─────────┼────────┤
│ Latency │ 8 ms │ 46 ms │ 196 ms │ 237 ms │ 63.03 ms │ 50.1 ms │ 351 ms │
└─────────┴──────┴───────┴────────┴────────┴──────────┴─────────┴────────┘
┌───────────┬────────┬────────┬────────┬─────────┬────────┬────────┬────────┐
│ Stat      │ 1%     │ 2.5%   │ 50%    │ 97.5%   │ Avg    │ Stdev  │ Min    │
├───────────┼────────┼────────┼────────┼─────────┼────────┼────────┼────────┤
│ Req/Sec   │ 2721   │ 2721   │ 3859   │ 4851    │ 3929.4 │ 691.81 │ 2721   │
├───────────┼────────┼────────┼────────┼─────────┼────────┼────────┼────────┤
│ Bytes/Sec │ 664 kB │ 664 kB │ 942 kB │ 1.18 MB │ 959 kB │ 169 kB │ 664 kB │
└───────────┴────────┴────────┴────────┴─────────┴────────┴────────┴────────┘

Req/Bytes counts sampled once per second.

40k requests in 10.14s, 9.59 MB read
```


１５スレッド４００コネクション
```
> autocannon -c 400 -w 15 -m GET http://127.0.0.1:1337

Running 10s test @ http://127.0.0.1:1337
400 connections
15 workers

┌─────────┬───────┬───────┬────────┬────────┬───────────┬───────────┬────────┐
│ Stat    │ 2.5%  │ 50%   │ 97.5%  │ 99%    │ Avg       │ Stdev     │ Max    │
├─────────┼───────┼───────┼────────┼────────┼───────────┼───────────┼────────┤
│ Latency │ 12 ms │ 98 ms │ 364 ms │ 444 ms │ 130.02 ms │ 104.33 ms │ 773 ms │
└─────────┴───────┴───────┴────────┴────────┴───────────┴───────────┴────────┘
┌───────────┬────────┬────────┬────────┬────────┬────────┬─────────┬────────┐
│ Stat      │ 1%     │ 2.5%   │ 50%    │ 97.5%  │ Avg    │ Stdev   │ Min    │
├───────────┼────────┼────────┼────────┼────────┼────────┼─────────┼────────┤
│ Req/Sec   │ 2603   │ 2603   │ 2875   │ 3669   │ 3026.2 │ 338.82  │ 2603   │
├───────────┼────────┼────────┼────────┼────────┼────────┼─────────┼────────┤
│ Bytes/Sec │ 635 kB │ 635 kB │ 702 kB │ 895 kB │ 738 kB │ 82.7 kB │ 635 kB │
└───────────┴────────┴────────┴────────┴────────┴────────┴─────────┴────────┘

Req/Bytes counts sampled once per second.

31k requests in 10.07s, 7.38 MB read
```

## おまけ
7Mbpsの環境からリクエスト

google.co.jp
```
> autocannon -m GET https://www.google.co.jp/

Running 10s test @ https://www.google.co.jp/
10 connections

┌─────────┬────────┬────────┬────────┬────────┬───────────┬──────────┬────────┐
│ Stat    │ 2.5%   │ 50%    │ 97.5%  │ 99%    │ Avg       │ Stdev    │ Max    │
├─────────┼────────┼────────┼────────┼────────┼───────────┼──────────┼────────┤
│ Latency │ 134 ms │ 165 ms │ 365 ms │ 537 ms │ 186.04 ms │ 66.28 ms │ 627 ms │
└─────────┴────────┴────────┴────────┴────────┴───────────┴──────────┴────────┘
┌───────────┬─────────┬─────────┬─────────┬─────────┬─────────┬────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%   │ Avg     │ Stdev  │ Min     │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼────────┼─────────┤
│ Req/Sec   │ 34      │ 34      │ 51      │ 64      │ 53.1    │ 8.68   │ 34      │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼────────┼─────────┤
│ Bytes/Sec │ 1.67 MB │ 1.67 MB │ 2.51 MB │ 3.15 MB │ 2.61 MB │ 426 kB │ 1.67 MB │
└───────────┴─────────┴─────────┴─────────┴─────────┴─────────┴────────┴─────────┘

Req/Bytes counts sampled once per second.

541 requests in 10.07s, 26.1 MB read
```

APack GMO ALTAS（Tokyo)
```
> autocannon -m GET -H AUTHORIZATION-APACK=30bb58e8f1972543b6129e4c7d76b13ea670b189eb436e6a5884c951 https://153.122.73.177/897dc182a5184d1edb259e560144927b38abe9e6c04bea46eab29786cddfd7b2/message/list/a
Running 10s test @ https://153.122.73.177/897dc182a5184d1edb259e560144927b38abe9e6c04bea46eab29786cddfd7b2/message/list/a
10 connections

┌─────────┬────────┬────────┬────────┬────────┬───────────┬──────────┬────────┐
│ Stat    │ 2.5%   │ 50%    │ 97.5%  │ 99%    │ Avg       │ Stdev    │ Max    │
├─────────┼────────┼────────┼────────┼────────┼───────────┼──────────┼────────┤
│ Latency │ 129 ms │ 235 ms │ 444 ms │ 538 ms │ 245.17 ms │ 89.22 ms │ 915 ms │
└─────────┴────────┴────────┴────────┴────────┴───────────┴──────────┴────────┘
┌───────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%   │ Avg     │ Stdev   │ Min     │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Req/Sec   │ 30      │ 30      │ 40      │ 44      │ 40.21   │ 3.77    │ 30      │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Bytes/Sec │ 12.2 kB │ 12.2 kB │ 16.2 kB │ 17.8 kB │ 16.3 kB │ 1.52 kB │ 12.2 kB │
└───────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┘

Req/Bytes counts sampled once per second.

412 requests in 10.06s, 163 kB read

```

相当アクセス受けているはずなのに、やっぱりGoogleはすごい。
というか、自分のコードがいかにクソかを思い知らされる。
しかし、この結果は最適化されていないので仕方がないと割り切っている。
