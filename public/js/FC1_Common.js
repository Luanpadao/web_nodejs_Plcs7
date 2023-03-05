
$(document).ready(function(){
    $("#introduce").show();
    $("#control").hide();
    $("#member").hide();
    $("#intructor").hide();
    $("#mode_a").hide();
    $("#mode_sa").show();
    $(".bt_import").css("background-color", "blue");
    // mode.placeholder = "SEMI-AUTO";
    $("#bt_introduce").click(function()
    {
        $("#introduce").show();
        $("#control").hide();
        $("#member").hide();
        $("#intructor").hide();
        $("#banner").show();
        bt_introduce.classList.add('active');
        bt_control.classList.remove('active');
        bt_member.classList.remove('active');
        bt_intructor.classList.remove('active');
    });
    $("#bt_tongquan").click(function(){
        $("#introduce").show();
        $("#control").hide();
        $("#member").hide();
        $("#intructor").hide();
        $("#banner").show();
        $("#content").css("background-color", "#fff");
        bt_introduce.classList.add('active');
        bt_control.classList.remove('active');
        bt_member.classList.remove('active');
        bt_intructor.classList.remove('active');
    });

    $("#bt_mohinh").click(function(){
        $("#introduce").show();
        $("#control").hide();
        $("#member").hide();
        $("#intructor").hide();
        $("#banner").show();
        $("#content").css("background-color", "#fff");
        bt_introduce.classList.add('active');
        bt_control.classList.remove('active');
        bt_member.classList.remove('active');
        bt_intructor.classList.remove('active');
    });


    $("#bt_control").click(function()
    {
        $('#bt_introduce').removeClass('active');
        $('#bt_control').addClass('active');
        $('#bt_member').removeClass('active');
        $('#bt_intructor').removeClass('active');
        $('#control').show();
        $('#introduce').hide();
    });
    $("#bt_scada").click(function(){
        $('#bt_introduce').removeClass('active');
        $('#bt_control').addClass('active');
        $('#bt_member').removeClass('active');
        $('#bt_intructor').removeClass('active');
        $('#control').show();
        $('#introduce').hide();
    });
    $("#bt_table").click(function(){
        $('#bt_introduce').removeClass('active');
        $('#bt_control').addClass('active');
        $('#bt_member').removeClass('active');
        $('#bt_intructor').removeClass('active');
        $('#control').show();
        $('#introduce').hide();
    });


    $("#bt_member").click(function()
    {
        $('#bt_introduce').removeClass('active');
        $('#bt_control').removeClass('active');
        $('#bt_member').addClass('active');
        $('#bt_intructor').removeClass('active');
    });
    $("#bt_intructor").click(function()
    {
        $('#bt_introduce').removeClass('active');
        $('#bt_control').removeClass('active');
        $('#bt_member').removeClass('active');
        $('#bt_intructor').addClass('active');
    });
    $("input[name='mode']").click(function(){
        var sw = $(this).val();
        if (sw == 1){
            $("#mode_sa").show();
            $("#mode_a").hide();
            mode.placeholder = "SEMI-AUTO";
            socket.emit('sw_mode', false);
        }
        else if(sw==2){
            $("#mode_sa").hide();
            $("#mode_a").show();
            mode.placeholder = "AUTO";
            socket.emit('sw_mode', true);
        }
    });
    $(".bt_import").click(function()
    {
        $(".bt_import").css("background-color", "blue");
        $(".bt_export").css("background-color", "#6c757d");
        socket.emit('sw_im_ex', false);
    })
    $(".bt_export").click(function()
    {
        $(".bt_import").css("background-color", "#6c757d");
        $(".bt_export").css("background-color", "blue");
        socket.emit('sw_im_ex', true);
    })
});
////////////// YÊU CẦU DỮ LIỆU TỪ SERVER- REQUEST DATA //////////////
var myVar = setInterval(myTimer, 100);
function myTimer() {
    socket.emit("Client-send-data", "Request data client");
}
 
// Hàm hiển thị dữ liệu lên IO Field
function fn_IOFieldDataShow(tag, IOField, tofix){
    socket.on(tag,function(data){
        if(tofix == 0){
            document.getElementById(IOField).value = data;
        } else{
        document.getElementById(IOField).value = data.toFixed(tofix);
        }
    });
}
// Hàm hiển thị màu nút nhấn
function fn_btt_Color(tag, bttID, on_Color, off_Color){
    socket.on(tag,function(data){
        if(data == true){
            document.getElementById(bttID).style.backgroundColor = on_Color;
        } else{
            document.getElementById(bttID).style.backgroundColor = off_Color; 
        }
    });
}
// Chương trình con chuyển trang
function fn_ScreenChange(scr_1, scr_2, scr_3, scr_4)
{
    document.getElementById(scr_1).style.visibility = 'visible';   // Hiển thị trang được chọn
    document.getElementById(scr_2).style.visibility = 'hidden';    // Ẩn trang 1
    document.getElementById(scr_3).style.visibility = 'hidden';    // Ẩn trang 2
    document.getElementById(scr_4).style.visibility = 'hidden';    // Ẩn trang 2
}
