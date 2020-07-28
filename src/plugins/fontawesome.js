import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowRight, faArrowLeft, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faArrowRight);
library.add(faArrowLeft);
library.add(faTimes);

Vue.component('font-awesome-icon', FontAwesomeIcon)
