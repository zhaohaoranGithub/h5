export default {
    data() {
      let vm = this;
      return {
        swiperList: [],

        swiperOption: {
          effect: 'fade',
          loop: true,
          allowSlideNext: false,
          allowSlidePrev: false,
          lazy: true,
        },

        swiperOptionThumbs: {
          lazy: true,
          spaceBetween: 10,
          touchRatio: 0.2,
          centeredSlides: true,
          slidesPerView: 3,
          loop: true,
          loopedSlides: 3, //looped slides should be the same
          slideToClickedSlide: true,
          // autoplay: {
          //   delay: 4900,
          //   disableOnInteraction: false,
          // }
        },
        activeIndex: 0,
        swiperOptionCash: {
          notNextTick: true,
          direction: "vertical",
          grabCursor: true,
          setWrapperSize: true,
          autoHeight: true,
          slidesPerView: 1,
          mousewheel: true,
          mousewheelControl: true,
          height: window.innerHeight,
          resistanceRatio: 0,
          observeParents: true,
          on: {
            slideChange: function () {
              vm.activeIndex = this.activeIndex;
            }
          }

        }
      };
    },

    computed: {
      cSwiperList() {
        return _.map(this.swiperList, (info) => {
          return {
            ...info,
            ...{
              poster: info.image,
              image: `background-image:url(${info.image})`,
              smallImage: `background-image:url(${info.smallImage ? info.smallImage : info.image})`,
              actionUrl: info.actionUrl,
            }
          };
        });
      }
    },

    methods: {
      defaultSwiperResponseFunc() {
        return {
          format: (data) => {
            if (!_.isEmpty(data)) {
              return data;
            } else {
              return this.defaultSwiper;
            }
          },
          afterFail: () => {
            this.swiperList = this.defaultSwiper;
          }
        };
      }
    }
  };
