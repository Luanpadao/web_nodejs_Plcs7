var sw = false;
var sw1 = false;
$(document).ready(function(){
    $("#introduce").show();
    $("#control").hide();
    $("#member").hide();
    $("#intructor").hide();
    $("#mode_m").show();
    $("#mode_sa").hide();
    $("#mode_a").hide();
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
            $("#mode_m").show();
            $("#mode_sa").hide();
            $("#mode_a").hide();
            mode.placeholder = "MANUAL";
            socket.emit('cmd_sw_mode',1);
        }
        else if(sw==2){
            $("#mode_m").hide();
            $("#mode_sa").show();
            $("#mode_a").hide();
            mode.placeholder = "SEMI AUTO";
            socket.emit('cmd_sw_mode',2);
        }
        else if(sw==3){
            $("#mode_m").hide();
            $("#mode_sa").hide();
            $("#mode_a").show();
            mode.placeholder = "AUTO";
            socket.emit('cmd_sw_mode',3);
        }
    });
    $(".bt_import").click(function()
    {
        $(".bt_import").css("background-color", "blue");
        $(".bt_export").css("background-color", "#6c757d");
        socket.emit('cmd_sw_im_ex', false);
    });
    $(".bt_export").click(function()
    {
        $(".bt_import").css("background-color", "#6c757d");
        $(".bt_export").css("background-color", "blue");
        socket.emit('cmd_sw_im_ex', true);
    });
    //////////////////////////////////////////////////////bt_start
    $(".bt_start").mousedown(function()
    {
        $(this).css("background-color","green");
        socket.emit('cmd_bt_start', true);
    });
    $(".bt_start").mouseup(function()
    {
        $(this).css("background-color","#6c757d");
        socket.emit('cmd_bt_start', false);
    });
    $(".bt_start").mouseout(function()
    {
        $(this).css("background-color","#6c757d");
        socket.emit('cmd_bt_start', false);
    });
    //////////////////////////////////////////////////////bt_stop
    $(".bt_stop").mousedown(function()
    {
        $(this).css("background-color","green");
        socket.emit('cmd_bt_stop', true);
    });
    $(".bt_stop").mouseup(function()
    {
        $(this).css("background-color","#6c757d");
        socket.emit('cmd_bt_stop', false);
    });
    $(".bt_stop").mouseout(function()
    {
        $(this).css("background-color","#6c757d");
        socket.emit('cmd_bt_stop', false);
    });
    //////////////////////////////////////////////////////bt_run
    $(".bt_run").mousedown(function()
    {
        $(this).css("background-color","green");
        socket.emit('cmd_bt_run', true);
    });
    $(".bt_run").mouseup(function()
    {
        $(this).css("background-color","#6c757d");
        socket.emit('cmd_bt_run', false);
    });
    $(".bt_run").mouseout(function()
    {
        $(this).css("background-color","#6c757d");
        socket.emit('cmd_bt_run', false);
    });
    //////////////////////////////////////////////////////bt_e_stop
    $(".bt_e-stop").mousedown(function()
    {
        $(this).css("background-color","green");
        socket.emit('cmd_bt_e-stop', true);
    });
    $(".bt_e-stop").mouseup(function()
    {
        $(this).css("background-color","#6c757d");
        socket.emit('cmd_bt_e_stop', false);
    });
    $(".bt_e-stop").mouseout(function()
    {
        $(this).css("background-color","#6c757d");
        socket.emit('cmd_bt_e_stop', false);
    });
    //////////////////////////////////////////////////////bt_x+
    $(".buttonx").mousedown(function()
    {
        $(this).css("background-color","green");
        socket.emit('cmd_bt_x+', true);
    });
    $(".buttonx").mouseup(function()
    {
        $(this).css("background-color","#6c757d");
        socket.emit('cmd_bt_x+', false);
    });
    $(".buttonx").mouseout(function()
    {
        $(this).css("background-color","#6c757d");
        socket.emit('cmd_bt_x+', false);
    });
    //////////////////////////////////////////////////////bt_x-
    $(".bt_x-").mousedown(function()
    {
        $(this).css("background-color","green");
        socket.emit('cmd_bt_x-', true);
    });
    $(".bt_x-").mouseup(function()
    {
        $(this).css("background-color","#6c757d");
        socket.emit('cmd_bt_x-', false);
    });
    $(".bt_x-").mouseout(function()
    {
        $(this).css("background-color","#6c757d");
        socket.emit('cmd_bt_x-', false);
    });
    //////////////////////////////////////////////////////bt_y+
    $(".buttony").mousedown(function()
    {
        $(this).css("background-color","green");
        socket.emit('cmd_bt_y+', true);
    });
    $(".buttony").mouseup(function()
    {
        $(this).css("background-color","#6c757d");
        socket.emit('cmd_bt_y+', false);
    });
    $(".buttony").mouseout(function()
    {
        $(this).css("background-color","#6c757d");
        socket.emit('cmd_bt_y+', false);
    });
    //////////////////////////////////////////////////////bt_y-
    $(".bt_y-").mousedown(function()
    {
        $(this).css("background-color","green");
        socket.emit('cmd_bt_y-', true);
    });
    $(".bt_y-").mouseup(function()
    {
        $(this).css("background-color","#6c757d");
        socket.emit('cmd_bt_y-', false);
    });
    $(".bt_y-").mouseout(function()
    {
        $(this).css("background-color","#6c757d");
        socket.emit('cmd_bt_y-', false);
    });
    //////////////////////////////////////////////////////bt_z+
    $(".buttonz").mousedown(function()
    {
        $(this).css("background-color","green");
        socket.emit('cmd_bt_z+', true);
    });
    $(".buttonz").mouseup(function()
    {
        $(this).css("background-color","#6c757d");
        socket.emit('cmd_bt_z+', false);
    });
    $(".buttonz").mouseout(function()
    {
        $(this).css("background-color","#6c757d");
        socket.emit('cmd_bt_z+', false);
    });
    //////////////////////////////////////////////////////bt_z-
    $(".bt_z-").mousedown(function()
    {
        $(this).css("background-color","green");
        socket.emit('cmd_bt_z-', true);
    });
    $(".bt_z-").mouseup(function()
    {
        $(this).css("background-color","#6c757d");
        socket.emit('cmd_bt_z-', false);
    });
    $(".bt_z-").mouseout(function()
    {
        $(this).css("background-color","#6c757d");
        socket.emit('cmd_bt_z-', false);
    });
    //////////////////////////////////////////////////////bt_dc_in
    $(".bt_dc_in").click(function()
    {
        sw = !sw;
        if(sw == true)
        {
            $(this).css("background-color","green");
            socket.emit('cmd_bt_dc_in', true);
        }
        else
        {
            $(this).css("background-color","#6c757d");
            socket.emit('cmd_bt_dc_in', false);
        }
    });
        //////////////////////////////////////////////////////bt_dc_out
        $(".bt_dc_out").click(function()
        {
            sw1 = !sw1;
            if(sw1 == true)
            {
                $(this).css("background-color","green");
                socket.emit('cmd_bt_dc_out, true');
            }
            else
            {
                $(this).css("background-color","#6c757d");
                socket.emit('cmd_bt_dc_out, false');
            }
        });
});
////////////// YÊU CẦU DỮ LIỆU TỪ SERVER- REQUEST DATA //////////////
var myVar = setInterval(myTimer, 100);
function myTimer() {
    socket.emit("Client-send-data", "Request data client");
    fn_IOFieldDataShow('pos_x','px',0);
    fn_IOFieldDataShow('pos_y','py',0);
    fn_IOFieldDataShow('pos_z','pz',0);
}
 
// Hàm hiển thị dữ liệu lên IO Field
function fn_IOFieldDataShow(tag, IOField, tofix){
    socket.on(tag,function(data){
        if(tofix == 0){
            document.getElementById(IOField).innerHTML = data;
        } else{
            document.getElementById(IOField).innerHTML = data.toFixed(tofix);
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
