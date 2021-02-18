'use strict';

{
    init();
}


/**
 * ページ読み込み時に実行する関数をまとめる。
 *
 */
function init() {
    getScrollButton();
    toggleTab();
}

/**
 * ページ内スクロール`
 */

function getScrollButton() {
    const scrollTrigger = document.querySelectorAll('a[href^="#"]');
    for (let i = 0; i < scrollTrigger.length; i++) {
        scrollTrigger[i].addEventListener('click', (e) => {
            e.preventDefault();
            let href = scrollTrigger[i].getAttribute('href');
            let targetElement = document.getElementById(href.replace('#', ''));
            const rect = targetElement.getBoundingClientRect().top;
            const offset = window.pageYOffset;
            // ヘッダーがトップ固定の場合はヘッダーの高さを入れる。
            const gap = 0;
            // 目的の要素の位置
            const target = rect + offset - gap;
            // behaviorでスピードを調整する。
            window.scrollTo({
                top: target,
                behavior: 'smooth',
            });
        })
    }
}

/**
 * タブの開閉機能
 *
 */
function toggleTab() {
    // .js-tabを持つボタンを全て取得
    const tabButton = document.querySelectorAll('.js-tab-button');
    const tabBlock = document.querySelectorAll('.js-tab-block');

    // ボタンにタブをつける
    for (let i = 0; i < tabButton.length; i++) {
        tabButton[i].addEventListener('click', () => {
            // 全てのタブボタンのaria-selectedをfalseにし、クリックしたタブボタンのみtrueにする。
            for (let i = 0; i < tabButton.length; i++) {
                tabButton[i].setAttribute('aria-selected', false);
            }
            tabButton[i].setAttribute('aria-selected', true);

             // 全てのタブブロックのaria-hiddenをtrueにし、クリックしたタブボタンに紐づいたブロックのみfalseにする。
            for (let i = 0; i < tabBlock.length; i++) {
                tabBlock[i].setAttribute('aria-hidden', true);
            }
            const targetId = tabButton[i].getAttribute('aria-controls');
            const targetTab = document.getElementById(targetId);
            targetTab.setAttribute('aria-hidden', false);
        });
    }

}