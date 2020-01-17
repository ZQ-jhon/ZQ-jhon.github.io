## BMS 之 ICON 进化史

**过程**
0. ICON 1.0 用一个图标,引入一个库(library)
0. 使用一个 ICON 自己打包字体文件，再引入
2. ICON 2.0 用一个图标,写一个 Svg 模板
3. ICON 3.0 用 Nebular 注册图标

**好处** 

- Nebular 负责将你传入的图标, 根据不同的 register font-icon pack, 来转换成对应的 SVG
- Nebular 负责将你传入的图标进行统一的尺寸及样式管理 by its theme system

**Example**

Before: 

```html
<svg class="dashboard">
......
<path fill="isCosmic ? '#000000' : '#ffffff'"> </path>
</svg>
```

After: 

```typescript
// app.component.ts

  this.iconLibraries.registerFontPack('@fortawesome/fontawesome-free', { packClass: 'fas', iconClassPrefix: 'fa' });
  // 使用自定义的 SVG
  this.iconLibraries.registerFontPack(PACKAGE_NAME);
  this.iconLibraries.registerSvgPack(PACKAGE_NAME, ICONS);

// icon-collection.ts
export const ICONS = {
  dashboard: `
    <!-- currentColor 是 nebular 自带的变量 -->
    <svg class="eva" fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      viewBox="0 0 428.948 428.948" style="enable-background:new 0 0 428.948 428.948;" xml:space="preserve">
        <g>
            <g>
                <path d="M221.988,280.48c9.664,0,17.516-7.889,17.516-17.563c0-9.653-7.852-17.487-17.516-17.487
          l-79.361-58.371l61.844,76.985C205.045,273.208,212.68,280.48,221.988,280.48z"/>
                <rect x="127.008" y="332.197" width="174.933" height="41.513"/>
                <path d="M366.13,118.057c-40.51-40.509-94.369-62.818-151.656-62.818
          c-57.288,0-111.148,22.309-151.657,62.818S0,212.425,0,269.713c0,36.99,9.319,72.539,26.816,103.997h40.086l29.319-16.929
          l-12.948-22.428l-37.7,21.768c-13.319-25.932-20.843-55.307-20.843-86.408c0-5.504,0.25-10.951,0.711-16.338l44.952,7.926
          l4.497-25.504l-45.481-8.019c8.127-35.883,26.451-67.937,51.755-92.948l30.815,36.725l19.839-16.646l-31.049-37.002
          c28.471-21.379,63.128-34.938,100.757-37.485v49.117h25.896V80.422c37.629,2.549,72.286,16.107,100.758,37.486l-31.05,37.001
          l19.838,16.646l30.816-36.726c25.303,25.012,43.627,57.066,51.754,92.948l-45.48,8.021l4.498,25.502l44.949-7.927
          c0.461,5.388,0.711,10.834,0.711,16.338c0,31.103-7.521,60.479-20.842,86.409l-37.701-21.766l-12.947,22.427l29.318,16.927h40.088
          c17.498-31.458,26.816-67.007,26.816-103.997C428.949,212.424,406.638,158.564,366.13,118.057z"/>
            </g>
        </g>
    </svg>
  `,
};

export const PACKAGE_NAME = 'custom-icons';

```

Use in MenuService: 

```typescript
const resourceCreatorMenu: NbMenuItem[] = [
    {
        title: '仪表盘',
        icon: { pack: PACKAGE_NAME, icon: 'dashboard'},
        link: '/dashboard',
        home: true
    };
```

Use in template:

```html
  <nb-icon icon="{{theme.icon}}" pack="{{packName}}"> </nb-icon>
```

<b>😘 觉得文章有用？点击下方打赏，鼓励作者更好的写作！</b>
