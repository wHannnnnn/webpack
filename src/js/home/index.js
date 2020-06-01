import '../layui/css/layui.css';
// import '../../js/other/layui.all.js';
import 'layui-src'
import '../../css/other/animate.min.css';
import './animate.js';
import '../../css/home/home.css';
import { http } from './http.js'
import { getData } from './utils.js'

$(function () {
    var allData = {
        changeData: [
            {
                id: 1,
                value: "日本"
            },
            {
                id: 2,
                value: "炼油厂"
            }
        ],
        categoryData: [
            {
                title: '国家地区',
                area: [
                    {
                        title: "热门",
                        country: [
                            { value: '日本' },
                            { value: '美国' },
                            { value: '台湾' },
                            { value: '中国' },
                        ]
                    },
                    {
                        title: "亚洲",
                        country: [
                            { value: '日本1' },
                            { value: '美国1' },
                            { value: '台湾1' },
                            { value: '中国1' },
                        ]
                    },
                    {
                        title: "欧洲",
                        country: [
                            { value: '日本' },
                            { value: '美国' },
                            { value: '台湾' },
                            { value: '中国' },
                        ]
                    },
                    {
                        title: "美洲",
                        country: [
                            { value: '日本' },
                            { value: '美国' },
                            { value: '台湾' },
                            { value: '中国' },
                        ]
                    },
                    {
                        title: "非洲",
                        country: [
                            { value: '日本' },
                            { value: '美国' },
                            { value: '台湾' },
                            { value: '中国' },
                        ]
                    },
                    {
                        title: "大洋洲",
                        country: [
                            { value: '日本' },
                            { value: '美国' },
                            { value: '台湾' },
                            { value: '中国' },
                        ]
                    },
                ]
            },
            {
                title: '类别'
            },
            {
                title: '分级'
            },
            {
                title: '筛选'
            }
        ]
    }
    // 数据渲染
    var getChange = changeList.innerHTML
        , changeView = document.getElementById('changeView')
        , getCategory = categoryList.innerHTML
        , categoryView = document.getElementById('categoryView')
    layui.laytpl(getChange).render(allData.changeData, function (html) {
        changeView.innerHTML = html;
    });
    layui.laytpl(getCategory).render(allData.categoryData, function (html) {
        categoryView.innerHTML = html;
    });
    layui.element.render()
    // 数据操作
    var search = new getData()
    layui.element.on('tabDelete(changeList)', async function (data) {
        allData.changeData.splice(data.index,1)
        // 数据接口  todo
        console.log(allData.changeData)
    });
    $('.country').on('click', async function(){
        layui.element.tabAdd('changeList', {
            title: $(this).html(),
            content: '',
            id: 3
        })
        allData.changeData.push({ id: 3, value: $(this).html()})
        // 数据接口  todo
    })
    $('#searchText').on('keydown', async function (e) {
        var e = e || window.event
        if (e.keyCode == 13) {
            const data = await search.formChange({ value: $(this).val() }, http.banner)
            $('.list').show()
        }
    });
})