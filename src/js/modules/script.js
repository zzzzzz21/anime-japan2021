'use strict';

// PC/SP判定フラグ
let isSmartPhone;
// ブレークポイント（px）
const breakPoint = '768';
// ブレークポイント（px）
let scrollFadeinContents;

{
    init();

    window.addEventListener('resize', () => {
        getDeviceWidth();
    });
    window.addEventListener('scroll', () => {
        for (let i = 0; i < scrollFadeinContents.length; i++) {
            addAnimationFunction(scrollFadeinContents[i])
        }
    });
    window.addEventListener('load', () => {
        deleteLoadingContent();
        
    })
}


/**
 * ページ読み込み時に実行する関数をまとめる。
 *
 */
function init() {
    getScrollButton();
    switchTab();
    getDeviceWidth();
    setAccordion();
    getFadeinElement();
}

/**
 * デバイス幅でPCもしくはスマートフォンかどうかの判定
 *
 */
function getDeviceWidth() {
    if (window.matchMedia && window.matchMedia('(max-device-width:' +  breakPoint + 'px)').matches) {
        isSmartPhone = true;
    } else {
        isSmartPhone = false;
    }
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
function switchTab() {
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

/**
 * アコーディオンの開閉機能
 *
 */
function setAccordion() {
    if(isSmartPhone) {
        // .js-accordionを持つボタンを全て取得
        const accordions = document.querySelectorAll('.js-accordion');

        // ボタンにタブをつける
        for (let i = 0; i < accordions.length; i++) {
            const button = accordions[i].querySelector('.js-accordion-button');
            const panel = accordions[i].querySelector('.js-accordion-panel');
            const buttonId = button.getAttribute('id');
            const panelId = panel.getAttribute('id');
            let panelHeight = panel.clientHeight;

            // アコーディオンに必要なwai-aria属性を付与する。
            button.setAttribute('aria-expanded', false);
            button.setAttribute('aria-controls', panelId);
            panel.setAttribute('aria-hidden', true);
            panel.setAttribute('aria-labelledby', buttonId);

            window.addEventListener('resize', () => {
                panelHeight = panel.clientHeight;
            });

            // アコーディオンの開閉昨日
            button.addEventListener('click', () => {
                const buttonAriaExpanded = button.getAttribute('aria-expanded');
                if(buttonAriaExpanded === 'true') {
                    button.setAttribute('aria-expanded', false);
                    panel.setAttribute('aria-hidden', true);
                    panel.style.maxHeight = 0;
                } else if(buttonAriaExpanded === 'false') {
                    button.setAttribute('aria-expanded', true);
                    panel.setAttribute('aria-hidden', false);
                    panel.style.maxHeight = `${panelHeight}px`;
                }
            });
        }
    }
}

/**
 * アコーディオンの開閉機能
 *
 */
function deleteLoadingContent() {
    const loadingContent = document.getElementById('js-loading');
    loadingContent.classList.add('is-deleted');
}

/**
 * アニメーションを起こす要素を取得
 */
function getFadeinElement() {
    scrollFadeinContents = document.querySelectorAll('.js-scroll-fadein');
}

/**
 * 要素がスクロール画面現れたらクラスをつける
 */
function addAnimationFunction(element) {
    // スクロール量
    let winScroll = window.pageYOffset;
    // ウィンドウの高さ
    let winHeight = window.innerHeight;
    // イベント発火位置(winHeight / 2 で中央辺り)
    let targetPosition = (winScroll + (winHeight / 1.5));

    if(element.offsetTop < targetPosition) {
        element.classList.add('is-show');
    }
}