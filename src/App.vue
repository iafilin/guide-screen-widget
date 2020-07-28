<template>
    <div class="guide-screen-widget" v-if="isShow">
        <div class="guide-screen-slide">
            <div class="guide-screen-slide__header">
                <div class="guide-screen-slide__header__left">
                    <div class="guide-screen-slide__header__left__title" v-if="currentScreen.has('title')">
                        {{ currentScreen.get('title') }}
                    </div>
                    <div class="guide-screen-slide__header__left__desc" v-if="currentScreen.has('desc')">
                        {{ currentScreen.get('desc') }}
                    </div>
                </div>
                <div class="guide-screen-slide__header__right" v-if="prevScreenKey || nextScreenKey">
                    <button @click.prevent="prevSlide" :disabled="!prevScreenKey"
                            :class="{ 'guide-screen-slide__header__right__arrow_disabled': !prevScreenKey}"
                            class="guide-screen-slide__header__right__arrow">
                        <font-awesome-icon :style="{ color: prevScreenKey ? 'white': '#b9b9b9' }" icon="arrow-left"></font-awesome-icon>
                    </button>
                    <button @click.prevent="nextSlide" :disabled="!nextScreenKey"
                            :class="{ 'guide-screen-slide__header__right__arrow_disabled': !nextScreenKey}"
                            class="guide-screen-slide__header__right__arrow">
                        <font-awesome-icon :style="{ color: nextScreenKey ? 'white': '#b9b9b9' }" icon="arrow-right"></font-awesome-icon>
                    </button>
                </div>
            </div>
            <div class="guide-screen-slide__body">
                <div style="position: relative">
                    <a href="#"
                       class="guide-screen-slide__body__btn"
                       v-if="currentScreen.has('links')"
                       v-for="link in currentScreen.get('links',[])"
                       :style="{ width: `${link.width}px`, height: `${link.height}px`, top: `${link.top}px`, left: `${link.left}px`, position: 'absolute' }"
                       @click.prevent="selectScreen(link.key)">
                        <div class="guide-screen-slide__body__btn_title">
                            {{ link.title }}
                        </div>
                        <div class="guide-screen-slide__body__btn_desc">
                            {{ link.text }}
                        </div>
                    </a>
                    <img style="width: 1200px; height: 600px" :src="currentScreen.get('img_src')" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import config from './assets/config'
    import _ from 'lodash'
    export default {
        name: 'App',
        components: {

        },
        data() {
            return {
                screenKey: 1,
                isShow: false,
            }
        },
        computed: {
            config() {
                return _(config)
            },
            currentScreen() {
                return _(this.config.get('screens').find(s => s.key === this.screenKey));
            },
            nextScreenKey() {
                return _(this.config.get('screens').find(s => s.key === this.screenKey)).get('next_key', false);
            },
            prevScreenKey() {
                return _(this.config.get('screens').find(s => s.key === this.screenKey)).get('prev_key', false);
            }
        },
        methods: {
            selectScreen(screenKey) {
                this.screenKey = screenKey
            },
            prevSlide() {
                this.selectScreen(this.prevScreenKey);
            },
            nextSlide() {
                this.selectScreen(this.nextScreenKey);
            }
        },
        watch: {
            screenKey(v) {
                console.log(v)
            }
        },
        mounted() {
            this.$nextTick(() => {
                const openEl = document.querySelector('[data-screen-widget-open]');
                if (openEl){
                    openEl.addEventListener('click',evt => {
                        evt.preventDefault();
                        this.isShow = !this.isShow;
                    })
                }
            });
        }
    }
</script>

<style lang="scss">
    .guide-screen-widget {

        position: fixed;
        overflow: hidden;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        height: 100%;
        width: 100%;
        background-color: white;

        .guide-screen-slide {

            &__header {

                background-color: #0000008a;
                color: white;
                width: 100%;
                display: flex;
                flex-direction: row;
                justify-content: space-between;

                &__left {
                    padding: 10px;

                    &__title {
                        font-family: Impact, sans-serif;
                        font-weight: bold;
                        font-size: 1.5em;
                    }

                    &__desc {

                    }
                }


                &__right {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    padding: 20px;
                    width: 70px;

                    &__arrow {
                        background: none;
                        border: 0;
                        cursor: pointer;

                        &_disabled {
                            color: #b9b9b9;
                            cursor: not-allowed;
                        }
                    }

                    &__arrow:focus {
                        outline: none;
                    }

                }
            }

            &__body {
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;

                &__btn {
                    background-color: #00000054;
                    box-shadow: white 0px 0px 20px, white 0px 0px 20px;
                    border-radius: 5px;
                    color: white;

                    &_title {
                        padding: 10px;
                    }
                    &_desc {
                        padding: 10px;
                    }
                }

            }
        }

    }
</style>
