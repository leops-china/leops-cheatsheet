import html from 'html-template-tag'
// import googleAnalytics from 'docute-google-analytics'
import Docute from '../src'
// import prismLanguages from '../src/utils/prismLanguages'
// import ColorBox from './components/ColorBox.vue'

const PatreonIcon = {
  template: html`
    <svg
      width="569px"
      height="546px"
      viewBox="0 0 569 546"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Patreon logo</title>
      <g>
        <circle
          fill="rgb(249, 104, 84)"
          id="Oval"
          cx="362.589996"
          cy="204.589996"
          r="204.589996"
        ></circle>
        <rect
          fill="rgb(5, 45, 73)"
          id="Rectangle"
          x="0"
          y="0"
          width="100"
          height="545.799988"
        ></rect>
      </g>
    </svg>
  `
}

new Docute({
  target: 'app',
  title: 'Leops 运维备忘单',
  highlight: [
    'typescript',
    'bash',
    'json',
    'markdown',
    'python',
    'powershell',
    'yaml'
  ],
  plugins: [
    // process.env.NODE_ENV === 'production' && googleAnalytics('UA-54857209-11')
  ].filter(Boolean),
  editLinkBase:
    'https://github.com/leops-china/leops-cheatsheet/tree/master/website/docs',
  editLinkText: '在 GitHub 上编辑此页',
  router: {
    mode: 'hash'
  },
  detectSystemDarkTheme: true,
  darkThemeToggler: true,
  sourcePath: '/',
  componentMixins: [
    // {
    //   data() {
    //     return {
    //       builtinLanguages: prismLanguages.builtin,
    //       deps: __DEPS__
    //     }
    //   },
    //   methods: {
    //     insertCustomFontsCSS() {
    //       const ID = 'custom-fonts-css'
    //       const existing = document.getElementById(ID)
    //       if (existing) {
    //         existing.parentNode.removeChild(existing)
    //       } else {
    //         const style = document.createElement('style')
    //         style.id = ID
    //         style.textContent = `
    //         /* Import desired font from Google fonts */
    //         @import url('https://fonts.googleapis.com/css?family=Lato');
    //         /* Apply the font to body (to override the default one) */
    //         body {
    //           font-family: Lato, sans-serif;
    //         }
    //         `
    //         document.head.appendChild(style)
    //       }
    //     }
    //   },
    //   components: {
    //     ColorBox
    //   }
    // }
  ],
  nav: [
    {
      title: 'CheatSheet',
      link: '/cheatsheet/'
    },
    {
      title: '配置',
      link: '/conf/'
    },
    {
      title: '脚本',
      link: '/scripts/'
    },
    {
      title: 'Version',
      link: 'https://lework.github.io/leversion/'
    },
    {
      title: '运维技术圈',
      link: 'https://leops.cn'
    },
    {
      title: 'GitHub',
      link: 'https://github.com/leops-china/leops-cheatsheet'
    }
  ],
  sidebar: [
    {
      title: '公共服务',
      children: [
        {
          title: '常用软件镜像',
          link: '/cheatsheet/public/mirrors'
        },
        {
          title: '常用公共服务',
          link: '/cheatsheet/public/public'
        }
      ]
    },
    {
      title: '语言',
      children: [
        {
          title: 'Bash',
          link: '/cheatsheet/linux/bash'
        },
        {
          title: 'jinja2',
          link: '/cheatsheet/dev/jinja2'
        },
        {
          title: 'ini',
          link: '/cheatsheet/dev/ini'
        },
        {
          title: 'yaml',
          link: '/cheatsheet/dev/yaml'
        },
        {
          title: 'json',
          link: '/cheatsheet/dev/json'
        },
        {
          title: 'jsonnet',
          link: '/cheatsheet/dev/jsonnet'
        },
        {
          title: 'markdown',
          link: '/cheatsheet/dev/markdown'
        },
        {
          title: 'javascripts',
          link: '/cheatsheet/dev/javascripts'
        },
        {
          title: 'vue',
          link: '/cheatsheet/dev/vue'
        },
        {
          title: 'python2-基础知识',
          link: '/cheatsheet/dev/python2/base'
        },
        {
          title: 'python2-排序算法',
          link: '/cheatsheet/dev/python2/sort'
        },
        {
          title: 'python2-内建函数和对象方法',
          link: '/cheatsheet/dev/python2/buildin'
        },
        {
          title: 'python2-函数和类',
          link: '/cheatsheet/dev/python2/function'
        },
        {
          title: 'python2-异常处理',
          link: '/cheatsheet/dev/python2/exception'
        },
        {
          title: 'python2-常用模块',
          link: '/cheatsheet/dev/python2/module'
        },
        {
          title: 'python2-编码规范',
          link: '/cheatsheet/dev/python2/pep008'
        },
        {
          title: 'python2-线程与进程',
          link: '/cheatsheet/dev/python2/process'
        },
        {
          title: 'python2-正则表达式',
          link: '/cheatsheet/dev/python2/reg'
        }
      ]
    },
    {
      title: 'Linux',
      children: [
        {
          title: '常用命令',
          link: '/cheatsheet/linux/linux'
        },
        {
          title: 'Git',
          link: '/cheatsheet/linux/git'
        },
        {
          title: 'Cron',
          link: '/cheatsheet/linux/cron'
        }
      ]
    },
    {
      title: '容器',
      children: [
        {
          title: 'docker',
          link: '/cheatsheet/container/docker'
        },
        {
          title: 'dockerfile',
          link: '/cheatsheet/container/dockerfile'
        },
        {
          title: 'docker-compose',
          link: '/cheatsheet/container/docker-compose'
        },
        {
          title: 'kubectl',
          link: '/cheatsheet/container/kubectl'
        },
        {
          title: 'helm',
          link: '/cheatsheet/container/helm'
        }
      ]
    },
    {
      title: '监控',
      children: [
        {
          title: 'Prometheus',
          link: '/cheatsheet/monitor/prometheus'
        },
        {
          title: 'Zabbix',
          link: '/cheatsheet/monitor/zabbix'
        }
      ]
    },
    {
      title: '数据库',
      children: [
        {
          title: 'Mysql',
          link: '/cheatsheet/db/mysql/mysql'
        },
        {
          title: 'Mysql常见错误代码',
          link: '/cheatsheet/db/mysql/code'
        }
      ]
    },
    {
      title: 'Devops',
      children: [
        {
          title: 'Ansible',
          link: '/cheatsheet/ops/ansible/ansible'
        },
        {
          title: 'Ansible关键字',
          link: '/cheatsheet/ops/ansible/keywords'
        }
      ]
    },
    {
      title: '消息队列',
      children: [
        {
          title: 'RabbitMQ',
          link: '/cheatsheet/mq/rabbitmq'
        }
      ]
    }
  ],
  overrides: {
    '/': {
      language: 'cheatsheet'
    },
    '/conf/': {
      language: '配置',
      sidebar: [
        {
          title: 'Linux',
          children: [
            {
              title: 'Systemd',
              link: '/conf/linux/systemd'
            }
          ]
        },
        {
          title: '容器',
          children: [
            {
              title: 'docker',
              link: '/conf/container/docker'
            },
            {
              title: 'docker-compose',
              link: '/conf/container/docker-compose'
            }
          ]
        },
        {
          title: 'Nginx',
          children: [
            {
              title: 'nginx配置',
              link: '/conf/nginx/nginx'
            },
            {
              title: '常用配置',
              link: '/conf/nginx/hot'
            },
            {
              title: '小例子',
              link: '/conf/nginx/example'
            }
          ]
        },
        {
          title: 'Supervisord',
          link: '/conf/supervisord/supervisord'
        },
        {
          title: 'Haproxy',
          link: '/conf/haproxy/haproxy'
        },
        {
          title: 'Zabbix',
          link: '/conf/zabbix/zabbix'
        },
        {
          title: 'Prometheus',
          link: '/conf/prometheus/prometheus'
        },
        {
          title: 'Mysql',
          link: '/conf/mysql/mysql'
        },
        {
          title: 'Redis',
          link: '/conf/redis/redis'
        },
        {
          title: 'Mongodb',
          link: '/conf/mongodb/mongodb'
        }
      ]
    },
    '/scripts/': {
      language: '脚本',
      sidebar: [
        {
          title: 'Bat',
          children: [
            {
              title: 'library',
              link: '/scripts/bat/library'
            },
            {
              title: '例子',
              link: '/scripts/bat/example'
            }
          ]
        },
        {
          title: 'Bash',
          children: [
            {
              title: 'library',
              link: '/scripts/bash/library'
            },
            {
              title: '例子',
              link: '/scripts/bash/example'
            }
          ]
        },
        {
          title: 'powershell',
          children: [
            {
              title: 'library',
              link: '/scripts/powershell/library'
            },
            {
              title: '例子',
              link: '/scripts/powershell/example'
            }
          ]
        },
        {
          title: 'python',
          children: [
            {
              title: 'library',
              link: '/scripts/python/library'
            },
            {
              title: '例子',
              link: '/scripts/python/example'
            }
          ]
        }
      ]
    }
  },
  footer: `
  <div style="border-top:1px solid var(--border-color);padding-top:30px;margin: 40px 0;color:#999999;font-size: .9rem;">
  &copy; ${new Date().getFullYear()} Developed by <a href="https://egoist.sh" target="_blank">EGOIST</a>. Powered by <a href="https://leops.cn" target="_blank">LEOPS</a>. Released under MIT license.
  </div>
  `,
  banner: {
    template: html`
      <div class="docute-banner">
        <note :label="false"
          ><PatreonIcon
            width="16"
            height="16"
            style="position:relative;top:2px;margin-right:8px;"
          />来这里提交你要的东西
          <a href="https://leops.cn/topics/node45" target="_blank"
            >Leops <ExternalLinkIcon
          /></a>
          我们来帮你完成.</note
        >
      </div>
    `,
    components: {
      PatreonIcon
    }
  }
})

Vue.component('ReverseText', {
  props: {
    text: {
      type: String,
      required: true
    }
  },
  template: html`
    <div class="reverse-text">
      {{ reversedText }}
      <v-style>
        .reverse-text { border: 1px solid var(--border-color); padding: 20px;
        font-weight: bold; border-radius: 4px; }
      </v-style>
    </div>
  `,
  computed: {
    reversedText() {
      return this.text
        .split('')
        .reverse()
        .join('')
    }
  }
})

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
}
