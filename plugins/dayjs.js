import Vue from 'vue'
import * as dayjs from 'dayjs'

Vue.filter('date', function(val, format = 'YYYY-MM-DD HH:mm:ss') {
    return dayjs(val).format(format)
})