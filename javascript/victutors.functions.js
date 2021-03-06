victutors.createNS("victutors.functions")

victutors.functions.length;
victutors.functions.selectedValue;

victutors.functions.PeopleList = [];
victutors.functions.middle = 0;
victutors.functions.questionNo = 0;
victutors.functions.showAnswer = 0;

$(function () {
    // 创建一个上传参数
    var uploadOption =
        {
            // 提交目标
            action: "uploadimage.php",
            // 服务端接收的名称
            name: "file",
            // 自动提交
            autoSubmit: false,
            // 选择文件之后…
            onChange: function (file, extension) {
                if (new RegExp(/(jpg)|(jpeg)|(bmp)|(gif)|(png)/i).test(extension)) {
                    //file ok

                    $("#filepath").val(file);
                    $('#up').click();

                } else {
                    alert("只限上传图片文件，请重新选择！");
                }
            },

            onSubmit: function (file, extension) {
                $("#state").val("正在上传" + file + "..");
                $('#imgSpinner').show();
            },
            // 上传完成之后
            onComplete: function (file, response) {
                $('#imgSpinner').hide();
                $("#state").val("上传完成！");
                console.log(response);
                $('#ImgUpLoad').attr("src", response + file);
                $('#ImgUpLoad').css({'width': '200px','height':'170px','margin-left': '50px','margin-bottom': '30px'});
            }
        }

    // 初始化图片上传框
    var oAjaxUpload = new AjaxUpload('#selector', uploadOption);

    // 给上传按钮增加上传动作
    $("#up").click(function () {
        oAjaxUpload.submit();
    });
});

$(function () {
    $('#landing-content').mousemove(function (e) {
        var amountMovedX = ((e.pageX - $("#mainPage").width() / 2) * -1 / 64);
        $(this).css('background-position', amountMovedX + 'px ' + '0px');
    });
});

$(function () {
    if ($('#gla')) {
        $('#gla_box>ul').roundabout({
            minOpacity: 1,
            btnNext: ".next",
            duration: 1000,
            reflect: true,
            btnPrev: '.prev',
            autoplay: true,
            autoplayDuration: 6000,
            tilt: 0,
            shape: 'figure8'
        });
    }
});

victutors.functions.answer = function (question) {
    var str = question;
    str = str.substring(2);
    var no1 = Number(str);
    var no2 = victutors.functions.questionNo;
    if (no1 != no2) {
        if (no2 != 0) {
            $('#ta' + no2).hide();
            $('#tq' + no2).html("<i class='fa fa-plus' aria-hidden='true'></i>");
        }
        $('#ta' + no1).show();
        $('#tq' + no1).html("<i class='fa fa-minus' aria-hidden='true'></i>");
        victutors.functions.questionNo = no1;
        victutors.functions.showAnswer = 1;
        /*
        for (i = 1; i <= 3; i++) {
            $('#ta' + str).hide();
            $('#tq' + str).html("<i class='fa fa-plus' aria-hidden='true'></i>");
        }*/
    } else {
        if (victutors.functions.showAnswer == 0) {
            $('#ta' + str).show();
            victutors.functions.showAnswer = 1;
            $('#tq' + str).html("<i class='fa fa-minus' aria-hidden='true'></i>");
        } else {
            $('#ta' + str).hide();
            victutors.functions.showAnswer = 0;
            $('#tq' + str).html("<i class='fa fa-plus' aria-hidden='true'></i>");
        }
    }
}

victutors.functions.gotoTop = function () {
    $("html, body").animate({
        scrollTop: 0
    }, "slow");
    return false;
}

victutors.functions.LoadRecommendTutorDetail = function (index) {
    var s = '';
    s += '<div class="w3-modal-content w3-animate-top w3-card-8"> ';
    s += '<header class="w3-container w3-teal"> ';
    s += '<span onclick="document.getElementById(\'RecommendTutorDetail\').style.display=\'none\' " class="w3-closebtn">&times;</span> ';
    s += '<h2 class="w3-center w3-lobster">详细信息</h2>';
    s += '</header>';
    s += '<div  class="w3-large container-fluid bg-grey" style = "margin-bottom:50px;margin-top:50px">';
    s += '<div class="row">' +
        '<div class="col-sm-3 slideanim w3-third">' +
        '<img src="' + PeopleList[index].imgsrc + '" style="width: 170px">' +
        '</div>' +
        '<div class="col-sm-5 w3-third w3-left">' +
        '<p style="margin-bottom: 25px">' +
        '<span class="glyphicon glyphicon-user"></span> 姓名：' + PeopleList[index].name +
        '</p>' +
        '<p style="margin-bottom: 25px">' +
        '<span class="glyphicon glyphicon-phone"></span> 电话：' + PeopleList[index].phone +
        '</p>' +
        '<p style="margin-bottom: 25px">' +
        '<span class="glyphicon glyphicon-envelope"></span> 邮箱：' + PeopleList[index].email +
        '</p>' +
        '<p style="margin-bottom: 25px">' +
        '<span class="glyphicon glyphicon-qrcode"></span> 微信：' + PeopleList[index].WeChat +
        '</p>' +
        '</div>' +
        '<div class="col-sm-3 slideanim w3-third">' +
        '<img src="' + PeopleList[index].qrcode + '" style="width: 170px">' +
        '</div>' +
        '</div>';
    s += '</div>';
    s += '<footer class="w3-container w3-teal"> <p class="w3-center w3-lobster ">www.victutors.com</p></footer>';
    s += '</div>';

    $('#TutorDetailRecommend').html(s);
    document.getElementById('RecommendTutorDetail').style.display = 'block';
}

victutors.functions.ShowList = function (pmn) {
    for (n = 0; n < 5; n++) {
        var i = pmn[n];
        var s = '';
        s += '<div class="w3-center w3-animate-opacity w3-blue-grey">';
        s += '<img src="' + PeopleList[i].imgsrc + '"' +
            'style="width: 50%">' +
            '<div class="w3-container">' +
            '<h3>' + PeopleList[i].name + '</h3>' +
            '<p >辅导科目: ' + PeopleList[i].subject + '</p>' +
            '<p>' +
            '<button class="w3-btn w3-green" onclick = "victutors.functions.LoadRecommendTutorDetail('
            + i
            + ')">详细信息</button>' +
            '</p>' +
            '</div>';
        $('.T0' + n).html(s);
    }
}

victutors.functions.list = function (change) {
    var l = PeopleList.length;        //list length
    var m = victutors.functions.middle;//middle

    victutors.functions.middle = (m + change + l) % l;
    m = victutors.functions.middle;
    var prevprev = (m - 2 + l) % l;
    var prev = (m - 1 + l) % l;
    var next = (m + 1 + l) % l;
    var nextnext = (m + 2 + l) % l;
    var pmn = [prevprev, prev, m, next, nextnext];

    victutors.functions.ShowList(pmn);
}

victutors.functions.Recommend = function () {
    PeopleList = [{
        name: "Wayne Zhang",
        phone: "778 922 5080",
        imgsrc: "./Images/img_avatar3.png",
        qrcode: "./Images/WeChat.png",
        email: "waynez@uvic.ca",
        WeChat: "wayne-zhangyuwei",
        subject: "CSC"
    }, {
            name: "Ace Ye",
            imgsrc: "./Images/img_avatar6.png",
            phone: "778 222 2929",
            qrcode: "./Images/WeChat3.png",
            email: "zaeye1028@gmail.com",
            WeChat: "yezihan1028",
            subject: "CSC"

        }, {
            name: "Wayne Lu",
            imgsrc: "./Images/img_avatar1.png",
            phone: "250 507 2503",
            qrcode: "./Images/Math/waynelu.jpg",
            email: "funfunlu@fhotmail.com",
            WeChat: "mogua001",
            subject: "MATH,STATS"
        }, {
            name: "Simon Zhu",
            imgsrc: "./Images/img_avatar3.png",
            phone: "778 557 7965",
            qrcode: "./Images/Math/SimonZhu.JPG",
            email: "zhus@uvic.ca",
            WeChat: "shuqiangzhu3",
            subject: "MATH"
        }, {
            name: "沈升益",
            phone: "250 882 6939",
            imgsrc: "./Images/img_avatar6.png",
            qrcode: "../Images/Math/shengshengyi.PNG",
            email: "g.spiritblue@gmail.com",
            WeChat: "541520752",
            subject: "MATH"
        },];
    victutors.functions.list(Math.floor(PeopleList.length / 2));

}

victutors.functions.GetTutorDetail = function (s, item) {
    s += '<div class=" w3-half w3-margin-bottom T01">';
    s += '<div class="w3-container w3-card-4" >';

    s += '<div class="w3-container w3-half">' +
        '<p>' + item.Name + '</p>' +
        '<p class="w3-opacity">' + item.WeChat + '</p>' +
        '<p>' + item.Phone + '</p>' +
        '<p>' + item.Email + '</p>' +
        '</div>';

    s += '<div class="w3-container w3-third w3-right">' +
        '<img src="' + item.Barcode + '"' + '" style="margin-top:4px; width: 100%">' +
        '</div>';
    s += '</div></div>';
    return s;
}

victutors.functions.ReSize = function () {
    var w = window.outerWidth;
    if ($('#TopNavBar').height() > 50) {
        $('#TopNavBar').hide();
    } else {
        $('#TopNavBar').show();
    }
}

victutors.functions.ShowHideServerPanel = function (flag) {
    if (flag == 0) {
        $('#services').hide();
        $('#serviceButton').delay(1000).show();
    } else {
        $('#serviceButton').hide();
        $('#services').show();
    }
}

//user search for faculty 
victutors.functions.GetTutorByFaculty = function () {
    if (typeof victutors.functions.selectedValue === 'undefined') {
        $('#searchAlert').show();
        return;
    }
    sessionStorage.setItem('faculty', victutors.functions.selectedValue); //set session storage (faculty that user search for)
    window.open('Tutorlist.php', '_self');
}

victutors.functions.SetUpSelectPicker = function () {
    for (i = 0; i < victutors.list.FacultyList.length; i++) {
        $('#Fselecter').append('<option class = "w3-large">' + victutors.list.FacultyList[i] + '</option>');
    }
}

/****************************/

//document ready start from here
$(document).ready(function () {

    //set background height
    $('#highsky').css({ 'height': window.innerHeight });
    $('#landing-content').css({ 'height': window.innerHeight });
    
    //set search and title 
    $('#searchToolPanel').css({ 'margin-top': window.innerHeight / 2 - 100 });
    var h = $('#gla').height()/2;
    $('#TeamList').css({ 'margin-top': window.innerHeight / 2 - h });
    victutors.functions.length = window.outerWidth;
    victutors.functions.Recommend();
    // go to top tooltip
    $('[data-toggle="gotop"], [data-toggle="title"], [data-toggle="showlist"], [data-toggle="gonext"]').tooltip({
        trigger: 'hover'
    });
    //setup select picker
    victutors.functions.SetUpSelectPicker();
    //footer current time
    document.getElementById("CurrentTime").innerHTML = Date();
    /**
     * Triggered when we scroll the page
     */
    $(window).scroll(function () {

        //Background img height
        if ($(window).scrollTop() > 660) {
            //Navbar
            $("#Faculty").fadeIn();
            $("#downward").fadeOut();
        } else {
            //Navbar
            $(".navbar").css({
                "background-color": "transparent",
                "border-color": "transparent"
            });
            $("#Faculty").fadeOut();
            $("#downward").fadeIn();
        }
        //gotoTop button
        if ($(window).scrollTop() > 300) {
            $('#GoToTopButton').show();
        } else {
            $('#GoToTopButton').fadeOut();
        }

    })

    // navibar scroll to a certain area
    var $root = $('html, body');
    $("#JoinUs, #Price, #Team, .Faculty").click(function () {
        $root.animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
        return false;
    });

    $('#Fselecter').selectpicker({ 'selectedText': '', style: 'btn-default btn-lg' });
    //faculty selecter
    $('#Fselecter').change(function () {
        var selectedText = $(this).find("option:selected").text();
        var faculty = selectedText.split(" ");
        victutors.functions.selectedValue = faculty[0];
    });
});






