// khai báo biến
var sw = 0;
var sw2 = 0;
var counter = [];
var temp = "";
var temp_qr = "";
var tempArr=[];
var pl_done = false;
var l2 = false;
var l3 = false;
var scada_display = 0;
var check_empty = false;
var type = '';
var finish_done = false;
var finish_1_done = false;
var enable_done = false;
const minValue = 0;
const maxValue = 155;
var thumb;
var slider;
const minValue_child = -3;
const maxValue_child = 3;
var thumb_child;
var slider_child;
const minValue_1 = 0;
const maxValue_1 = 355;
var thumb_1;
var slider_1;
const minValue_1_child = -3;
const maxValue_1_child = 3;
var thumb_1_child;
var slider_1_child;
var qrcode_dis;
var name_dis;
var type_dis;
var pos_dis;
var pos_enable = false;
var im_ex = false;
var fc_user = '';
var user_viewer = false;
var status_plc = false;
var status_connect_plc = false;
let previousState = false;
let unchangedCounter = 0;
var step = 100;
var enable_done_2 = false;
var qr_err_done = false;
var logined = false;
var test = false;
// Chương trình xử lý sự khi sau khi đã load web
$(document).ready(function(){
    thumb = document.querySelector('.slider-thumb');
    slider = document.querySelector('.slider_s');
    thumb_child = document.querySelector('.slider-thumb_child');
    slider_child = document.querySelector('.slider_child');
    thumb_1 = document.querySelector('.slider_1-thumb');
    slider_1 = document.querySelector('.slider_1_s');
    thumb_1_child = document.querySelector('.slider_1-thumb_child');
    slider_1_child = document.querySelector('.slider_1_child');
    $("#introduce").show();
    $("#control").hide();
    $("#member").hide();
    $("#user").hide();
    $("#mode_sa").css("background-color", "blue");
    $("#bt_import").css("background-color", "blue");
    fn_IOFieldDataShow('pos_x','px',1);
    fn_IOFieldDataShow('pos_y','py',1);
    fn_IOFieldDataShow('pos_z','pz',1);
    fn_IOFieldDataShow('qr_err','','');
    fn_SymbolStatus('ss_i1','sstc','ss_i1');
    fn_SymbolStatus('ss_i2','sstc','ss_i2');
    fn_SymbolStatus('ss_o','sstc','ss_o');
    fn_SymbolStatus('dc_i','dc','dc_i');
    fn_SymbolStatus('dc_o','dc','dc_o');
    fn_SymbolStatus('n1','','pos_1');
    fn_SymbolStatus('n2','','pos_2');
    fn_SymbolStatus('n3','','pos_3');
    fn_SymbolStatus('n4','','pos_4');
    fn_SymbolStatus('n5','','pos_5');
    fn_SymbolStatus('n6','','pos_6');
    fn_SymbolStatus('n7','','pos_7');
    fn_SymbolStatus('n8','','pos_8');
    fn_SymbolStatus('n9','','pos_9');
    fn_SymbolStatus('n10','','pos_10');
    fn_SymbolStatus('n11','','pos_11');
    fn_SymbolStatus('n12','','pos_12');
    fn_SymbolStatus('n13','','pos_13');
    fn_SymbolStatus('n14','','pos_14');
    fn_SymbolStatus('n15','','pos_15');
    fn_SymbolStatus('n16','','pos_16');
    fn_SymbolStatus('n17','','pos_17');
    fn_SymbolStatus('n18','','pos_18');
    fn_SymbolStatus('led_2','','running');
    fn_SymbolStatus('led_3','','process_stop');
    fn_SymbolStatus('ss_i1_display2','sstc','ss_i1');
    fn_SymbolStatus('ss_i2_display2','sstc','ss_i2');
    fn_SymbolStatus('ss_o_display2','sstc','ss_o');
    fn_SymbolStatus('dc_i_display2','motor','dc_i');
    fn_SymbolStatus('dc_o_display2','motor','dc_o');
    fn_SymbolStatus('stepx','step','step_x');
    fn_SymbolStatus('stepz','step','step_z');
    fn_SymbolStatus('led_dc_i','motor','dc_i');
    fn_SymbolStatus('led_dc_o','motor','dc_o');
    fn_SymbolStatus('led_ss_i1','sstc','ss_i1');
    fn_SymbolStatus('led_ss_i2','sstc','ss_i2');
    fn_SymbolStatus('led_ss_o','sstc','ss_o');
    fn_SymbolStatus('led_ss_x','status','ss_x');
    fn_SymbolStatus('led_ss_y','status','ss_y');
    fn_SymbolStatus('led_ss_z','status','ss_z');
    fn_SymbolStatus('led_stepx','step','step_x');
    fn_SymbolStatus('led_stepy','step','step_y');
    fn_SymbolStatus('led_stepz','step','step_z');
    fn_IOFieldDataShow('qr_code','i1',0);
    fn_IOFieldDataShow('processed','',0);
    fn_IOFieldDataShow('counter','',0);
    fn_IOFieldDataShow('finished','',0);
    fn_IOFieldDataShow('enable','',0);
    fn_IOFieldDataShow('status_robot','status_robot',0);
    fn_Table_SQL_show_pre_data();
    fn_Table_SQL_show_data();
    fn_Show_SQL_By_Time();
    fn_excel_01();
    fn_display_pos_after_xla();
    data_fc();
    fn_process_stop();
    //////////////////////////////////////////////////////bt_introduce_chuyen trang
    $("#bt_introduce").click(function()
    {
        $("#introduce").show();
        $("#control").hide();
        $("#member").hide();
        $("#user").hide();
        $("#banner").show();
        bt_introduce.classList.add('active');
        bt_control.classList.remove('active');
        bt_member.classList.remove('active');
        bt_user.classList.remove('active');
    });
    //////////////////////////////////////////////////////bt_tongquan_chuyen trang
    $("#bt_tongquan").click(function(){
        document.getElementById('navbarResponsive').classList.remove('show');
        $("#introduce").show();
        $("#control").hide();
        $("#member").hide();
        $("#user").hide();
        $("#banner").show();
        $("#content").css("background-color", "#fff");
        bt_introduce.classList.add('active');
        bt_control.classList.remove('active');
        bt_member.classList.remove('active');
        bt_user.classList.remove('active');
    });
    //////////////////////////////////////////////////////bt_mohinh_chuyentrang
    $("#bt_mohinh").click(function(){
        document.getElementById('navbarResponsive').classList.remove('show');
        $("#introduce").show();
        $("#control").hide();
        $("#member").hide();
        $("#user").hide();
        $("#banner").show();
        $("#content").css("background-color", "#fff");
        bt_introduce.classList.add('active');
        bt_control.classList.remove('active');
        bt_member.classList.remove('active');
        bt_user.classList.remove('active');
    });
    //////////////////////////////////////////////////////bt_control_chuyen trang
    $("#bt_control").click(function()
    {
        $('#bt_introduce').removeClass('active');
        $('#bt_member').removeClass('active');
        if(document.getElementById("access_user_control").checked )
        {
            $('#scada').show();
            $("#table").hide();
            $('#control').show();
            $('#bt_control').addClass('active');
            $('#bt_user').removeClass('active');
            $('#user').hide();
            if(scada_display == 0 | scada_display == 1)
            {
                $('#scada_display1').show();
                $('#scada_display2').hide();
            }
            else
            {
                $('#scada_display1').hide();
                $('#scada_display2').show();
            }
            $('#gd_dk').show();
            $('#gd_dk_viewer').hide();

        }
        else if(document.getElementById("access_user_admin").checked
                | document.getElementById("access_user_report").checked
                | document.getElementById("access_user_viewer").checked)
        {
            $('#scada').show();
            $("#table").hide();
            $('#control').show();
            $('#bt_control').addClass('active');
            $('#bt_user').removeClass('active');
            $('#user').hide();
            if(scada_display == 0 | scada_display == 1)
            {
                $('#scada_display1').show();
                $('#scada_display2').hide();
            }
            else
            {
                $('#scada_display1').hide();
                $('#scada_display2').show();
            }
            $('#gd_dk').hide();
            $('#gd_dk_viewer').show();
        }
        else
        {
            setTimeout(function() {
                alert('Vui lòng đăng nhập để được giám sát!');
            }, 500);
            $('#bt_control').removeClass('active');
            $('#bt_user').addClass('active');
            $('#user').show();
            $('#control').hide();
        }
        $('#introduce').hide();
        $('#member').hide();
        // sd để edit
        // $('#introduce').hide();
        // $('#control').show();
        // $('#scada_display1').hide();
        // $('#scada_display2').show();
        // $("#table").hide();
        // sd để edit
    });
    //////////////////////////////////////////////////////bt_scada_1chuyen trang
    $("#bt_scada").click(function(){
        document.getElementById('navbarResponsive').classList.remove('show');
        $('#bt_introduce').removeClass('active');
        $('#bt_member').removeClass('active');
        $('#introduce').hide();
        $('#member').hide();
        if(document.getElementById("access_user_control").checked)
        {
            $('#bt_control').addClass('active');
            $('#bt_user').removeClass('active');
            $('#control').show();
            $('#scada').show();
            $('#scada_display1').show();
            $('#scada_display2').hide();
            scada_display = 1;
            $("#table").hide();
            $('#user').hide();
            $('#gd_dk').show();
            $('#gd_dk_viewer').hide();
        }
        else if(document.getElementById("access_user_report").checked
            | document.getElementById("access_user_admin").checked
            | document.getElementById("access_user_viewer").checked)
        {
            $('#bt_control').addClass('active');
            $('#bt_user').removeClass('active');
            $('#control').show();
            $('#scada').show();
            $('#scada_display1').show();
            $('#scada_display2').hide();
            scada_display = 1;
            $("#table").hide();
            $('#user').hide();
            $('#gd_dk').hide();
            $('#gd_dk_viewer').show();
        }
        else
        {
            $('#bt_control').removeClass('active');
            $('#bt_user').addClass('active');
            setTimeout(function() {
                alert('Vui lòng đăng nhập để được giám sát!');
            }, 500);
            $('#user').show();
            $('#control').hide();
        }
    });
    //////////////////////////////////////////////////////bt_scada_2chuyen trang
    $("#bt_scada_display_2").click(function(){
        document.getElementById('navbarResponsive').classList.remove('show');
        $('#bt_introduce').removeClass('active');
        $('#bt_member').removeClass('active');
        $('#introduce').hide();
        $('#member').hide();
        if(document.getElementById("access_user_control").checked)
        {
            $('#bt_control').addClass('active');
            $('#bt_user').removeClass('active');
            $('#control').show();
            $('#scada').show();
            $('#scada_display1').hide();
            $('#scada_display2').show();
            scada_display = 2;
            $("#table").hide();
            $('#user').hide();
            $('#gd_dk').show();
            $('#gd_dk_viewer').hide();
        }
        else if(document.getElementById("access_user_report").checked
            | document.getElementById("access_user_admin").checked
            | document.getElementById("access_user_viewer").checked )
        {
            $('#bt_control').addClass('active');
            $('#bt_user').removeClass('active');
            $('#control').show();
            $('#scada').show();
            $('#scada_display1').hide();
            $('#scada_display2').show();
            scada_display = 2;
            $("#table").hide();
            $('#user').hide();
            $('#gd_dk').hide();
            $('#gd_dk_viewer').show();
        }
        else
        {
            $('#bt_control').removeClass('active');
            $('#bt_user').addClass('active');
            setTimeout(function() {
                alert('Vui lòng đăng nhập để được giám sát!');
            }, 500);
            $('#user').show();
            $('#control').hide();
        }
    });
    //////////////////////////////////////////////////////bt_table_chuyen trang
    $("#bt_table").click(function(){
        document.getElementById('navbarResponsive').classList.remove('show');
        $('#bt_introduce').removeClass('active');
        $('#bt_member').removeClass('active');
        $('#introduce').hide();
        $('#member').hide();
        fn_Table01_SQL_Show_data();
        if(document.getElementById("access_user_viewer").checked )
        {
            $('#bt_control').addClass('active');
            $('#bt_user').removeClass('active');
            $('#control').show();
            $('#scada').hide();
            $("#table").show();
            $('#user').hide();
            $('#btt_Excel').hide();

        }
        else if(document.getElementById("access_user_admin").checked
                | document.getElementById("access_user_report").checked
                | document.getElementById("access_user_control").checked)
        {
            $('#bt_control').addClass('active');
            $('#bt_user').removeClass('active');
            $('#control').show();
            $('#scada').hide();
            $("#table").show();
            $('#user').hide();
            $('#btt_Excel').show();
        }
        else
        {
            $('#bt_control').removeClass('active');
            $('#bt_user').addClass('active');
            setTimeout(function() {
                alert('Vui lòng đăng nhập để được giám sát!');
            }, 500);
            $('#user').show();
            $('#control').hide();
        }
    });
    //////////////////////////////////////////////////////bt_user_chuyen trang
    $("#bt_user").click(function()
    {
        document.getElementById('navbarResponsive').classList.remove('show');
        $('#bt_introduce').removeClass('active');
        $('#bt_control').removeClass('active');
        $('#bt_member').removeClass('active');
        $('#bt_user').addClass('active');
        $('#control').hide();
        $('#introduce').hide();
        $('#user').show();
        $('#member').hide();
    });
    //////////////////////////////////////////////////////bt_member_chuyen trang
    $("#bt_member").click(function()
    {
        $('#bt_introduce').removeClass('active');
        $('#bt_control').removeClass('active');
        $('#bt_member').addClass('active');
        $('#bt_user').removeClass('active');
        $("#introduce").hide();
        $("#control").hide();
        $("#member").hide();
        $("#user").hide();
        $("#banner").hide();
        $("#member").show();
    });
    //////////////////////////////////////////////////////bt_member_1 chuyen trang
    $("#bt_member1").click(function()
    {
        document.getElementById('navbarResponsive').classList.remove('show');
        $('#bt_introduce').removeClass('active');
        $('#bt_control').removeClass('active');
        $('#bt_member').addClass('active');
        $('#bt_user').removeClass('active');
        $("#introduce").hide();
        $("#control").hide();
        $("#member").hide();
        $("#user").hide();
        $("#banner").hide();
        $("#member").show();
    });
    //////////////////////////////////////////////////////bt_member_2 chuyen trang
    $("#bt_member2").click(function()
    {
        document.getElementById('navbarResponsive').classList.remove('show');
        $('#bt_introduce').removeClass('active');
        $('#bt_control').removeClass('active');
        $('#bt_member').addClass('active');
        $('#bt_user').removeClass('active');
        $("#introduce").hide();
        $("#control").hide();
        $("#member").hide();
        $("#user").hide();
        $("#banner").hide();
        $("#member").show();
    });
    //////////////////////////////////////////////////////bt_member_3 chuyen trang
    $("#bt_member3").click(function()
    {
        document.getElementById('navbarResponsive').classList.remove('show');
        $('#bt_introduce').removeClass('active');
        $('#bt_control').removeClass('active');
        $('#bt_member').addClass('active');
        $('#bt_user').removeClass('active');
        $("#introduce").hide();
        $("#control").hide();
        $("#member").hide();
        $("#user").hide();
        $("#banner").hide();
        $("#member").show();
    });
    //////////////////////////////////////////////////////bt_member_4 chuyen trang
    $("#bt_member4").click(function()
    {
        document.getElementById('navbarResponsive').classList.remove('show');
        $('#bt_introduce').removeClass('active');
        $('#bt_control').removeClass('active');
        $('#bt_member').addClass('active');
        $('#bt_user').removeClass('active');
        $("#introduce").hide();
        $("#control").hide();
        $("#member").hide();
        $("#user").hide();
        $("#banner").hide();
        $("#member").show();
    });
    //////////////////////////////////////////////////////bt_member_5 chuyen trang
    $("#bt_member5").click(function()
    {
        document.getElementById('navbarResponsive').classList.remove('show');
        $('#bt_introduce').removeClass('active');
        $('#bt_control').removeClass('active');
        $('#bt_member').addClass('active');
        $('#bt_user').removeClass('active');
        $("#introduce").hide();
        $("#control").hide();
        $("#member").hide();
        $("#user").hide();
        $("#banner").hide();
        $("#member").show();
    });
    //////////////////////////////////////////////////////switch_Mode
    $("#mode_sa").click(function()
    {
        if(l2 == false)
        {
            sw = 0;
            $("#mode_sa").css("background-color", "blue");
            $("#mode_a").css("background-color", "#6c757d");
            mode.placeholder = "SEMI AUTO";
            socket.emit('cmd_sw_mode',false);       //gửi yêu cầu server set tag sw_mode giá trị false
        }
        else
            alert("Robot đang hoạt động, không đổi được chế độ!");
    });
    $("#mode_a").click(function()
    {
        if(l2 == false)
        {
            sw = 1;
            $("#mode_sa").css("background-color", "#6c757d");
            $("#mode_a").css("background-color", "blue");
            mode.placeholder = "AUTO";
            socket.emit('cmd_sw_mode',true);        //gửi yêu cầu server set tag sw_mode giá trị true
        }
        else
            alert("Robot đang hoạt động, không đổi được chế độ!");
    });
    //////////////////////////////////////////////////////bt_import
    $("#bt_import").click(function()
    {
        if(l2 == false)
        {
            sw2 = 0;
            $("#bt_import").css("background-color", "blue");
            $("#bt_export").css("background-color", "#6c757d");
            socket.emit('cmd_sw_im_ex', false);
        }
        else
            alert("Robot đang hoạt động, không đổi được chế độ!");
    });
    //////////////////////////////////////////////////////bt_export
    $("#bt_export").click(function()
    {
        if(l2 == false)
        {
            sw2 = 1;
            $("#bt_import").css("background-color", "#6c757d");
            $("#bt_export").css("background-color", "blue");
            socket.emit('cmd_sw_im_ex', true);
        }
        else
            alert("Robot đang hoạt động, không đổi được chế độ!");
    });
    //////////////////////////////////////////////////////bt_stop
    $("#bt_stop").mousedown(function()
    {
        $(this).css("background-color","green");
        socket.emit('cmd_bt_stop', true);
    });
    $("#bt_stop").mouseup(function()
    {
        $(this).css("background-color","#6c757d");
        socket.emit('cmd_bt_stop', false);
    });
    $("#bt_stop").mouseout(function()
    {
        $(this).css("background-color","#6c757d");
        socket.emit('cmd_bt_stop', false);
    });
    //////////////////////////////////////////////////////bt_run
    $("#bt_run").mousedown(function()
    {
        if(sw == 0 & sw2 == 1)      //Chế độ xuất bán tự động
        {
            document.getElementById('gd_dk_1').classList.add('d-none');
            document.getElementById('gd_dk_3').classList.remove('d-none');
            step_process(1);
            $('#pos_ex').val("");
        }
        else if(sw == 1 & sw2 == 1) //Chế độ xuất tự động
        {
            document.getElementById('gd_dk_1').classList.add('d-none');
            document.getElementById('gd_dk_4').classList.remove('d-none');
        }
        $(this).css("background-color","green");
        socket.emit('cmd_bt_run', true);
    });
    $("#bt_run").mouseup(function()
    {
        // document.getElementById("bt_run").disabled = true;
        $(this).css("background-color","#6c757d");
        socket.emit('cmd_bt_run', false);
    });
    $("#bt_run").mouseout(function()
    {
        $(this).css("background-color","#6c757d");
        socket.emit('cmd_bt_run', false);
    });
    //////////////////////////////////////////////////////bt_e_stop
    $("#bt_e_stop").mousedown(function()
    {
        $(this).css("background-color","green");
        socket.emit('cmd_bt_e_stop', true);
    });
    $("#bt_e_stop").mouseup(function()
    {
        $(this).css("background-color","#6c757d");
        socket.emit('cmd_bt_e_stop', false);
    });
    $("#bt_e_stop").mouseout(function()
    {
        $(this).css("background-color","#6c757d");
        socket.emit('cmd_bt_e_stop', false);
    });
    //////////////////////////////////////////////////////bt_select_im
    $("#bt_select_im").click(function()
    {
        select_im();
    });
    //////////////////////////////////////////////////////bt_select_ex
    $("#bt_select_ex").click(function()
    {
        select_ex();
    });
    //////////////////////////////////////////////////////bt_typeA
    $("#bt_typeA").click(function()
    {
        type = 'A';
        fn_Table01_SQL_Show();
        document.getElementById('gd_dk_1').classList.remove('d-none');
        document.getElementById('gd_dk_4').classList.add('d-none');
    });
    //////////////////////////////////////////////////////bt_typeB
    $("#bt_typeB").click(function()
    {
        type = 'B';
        fn_Table01_SQL_Show();
        document.getElementById('gd_dk_1').classList.remove('d-none');
        document.getElementById('gd_dk_4').classList.add('d-none');
    });
    //////////////////////////////////////////////////////bt_typeC
    $("#bt_typeC").click(function()
    {
        type = 'C';
        fn_Table01_SQL_Show();
        document.getElementById('gd_dk_1').classList.remove('d-none');
        document.getElementById('gd_dk_4').classList.add('d-none');
    });
    //////////////////////////////////////////////////////bt_cancle_panel
    $(".bt_cancle_panel").click(function()
    {
        document.getElementById('gd_dk_1').classList.remove('d-none');
        document.getElementById('gd_dk_2').classList.add('d-none');
        document.getElementById('gd_dk_3').classList.add('d-none');
        document.getElementById('gd_dk_4').classList.add('d-none');
        step_process(100);
    });
});
////////////// YÊU CẦU DỮ LIỆU TỪ SERVER- REQUEST DATA //////////////
var myVar = setInterval(myTimer, 100);
function myTimer() {
    socket.emit("Client-send-data", "Request data client");
}
// HÀM HIỂN THỊ DỮ LIỆU LÊN IO FIELD
function fn_IOFieldDataShow(tag, IOField, tofix){
    socket.on(tag,function(data){
        // Chương trình xử lý tag qr_code
        if(tag == 'qr_code')
            temp_qr = data;
        // Chương trình xử lý tag finished ở cuối mỗi quy trình
        else if(tag == 'finished')  
        {
            if(data == true & finish_done != data)
            {
                $("#i1").val("");
                $("#i2").val("");
                $("#i3").val("");
                $("#i4").val("");
                socket.emit('cmd_pos', '0');
                if(user_viewer == false)
                {
                    if(im_ex == false)
                    document.getElementById("nd_tb_viewer").innerHTML = "Hoàn thành nhập kho "+pos_dis+"!";
                    else 
                    document.getElementById("nd_tb_viewer").innerHTML = "Hoàn thành xuất kho "+pos_dis+"!";
                }
                else
                    document.getElementById("nd_tb_viewer").innerHTML = "Hoàn thành xuất kho!";
                setTimeout(function() {
                    document.getElementById("nd_tb_viewer").innerHTML = "Đang ở chế độ giám sát";
                }, 1000);
                socket.emit("msg_send_data_SQL",tempArr);
                if(sw == 1 & sw2 == 1 & type != "")     //nếu là chế độ xuất kho, tự động gửi vị trí xuất mới
                {
                    setTimeout(function() {
                        fn_Table01_SQL_Show();
                    }, 200);

                }    
            }
            finish_done = data;
        }
        // Chương trình xử lý tag enable (tag được sử dụng để cho phép điều khiển sau khi tủ điện ON)
        else if(tag == 'enable')
        {
            if(enable_done != data)
            {
                if(data == true)
                {
                    document.getElementById('gd_dk_1').classList.remove('d-none');
                    document.getElementById('gd_dk_5').classList.add('d-none');
                    enable_done_2 = true;
                }
                else if(data == false & test == true)
                {
                    document.getElementById('gd_dk_1').classList.add('d-none');
                    document.getElementById("nd_tb").innerHTML = "Vui lòng nhấn ON tại tủ điện để cho phép điều khiển!";
                    document.getElementById('gd_dk_5').classList.remove('d-none');
                }
            }
            enable_done = data;
        }
        else if (tag == 'qr_err')
        {
            if(data == true & qr_err_done != data)
            {
                socket.emit("cmd_qr_err", false);
                if(logined == true)
                {
                    setTimeout(function() {
                        alert('Không phát hiện được mã QR!');
                    }, 500);
                }
            }
            qr_err_done = data;
        }
        // Chương trình xử lý các giá trị tag counter, đếm số lượng ô đã nhập
        else if(tag == 'counter')
        {
            counter[0] = parseInt(data[1]);
            counter[1] = parseInt(data[4]);
            counter[2] = parseInt(data[7]);
            document.getElementById("counter_1").innerHTML = counter[0] + "/6";
            document.getElementById("counter_2").innerHTML = counter[1] + "/6";
            document.getElementById("counter_3").innerHTML = counter[2] + "/6";
            if(counter[0] == 6)
            {
                $('#status_A').css("background-color","green");
                document.getElementById("counter_A").innerHTML = "Full";
            }
            else
            {
                $('#status_A').css("background-color","#fff");
                document.getElementById("counter_A").innerHTML = "";
            }
            if(counter[1] == 6)
            {
                $('#status_B').css("background-color","green");
                document.getElementById("counter_B").innerHTML = "Full";
            }
            else
            {
                $('#status_B').css("background-color","#fff");
                document.getElementById("counter_B").innerHTML = "";
            }
            if(counter[2] == 6)
            {
                $('#status_C').css("background-color","green");
                document.getElementById("counter_C").innerHTML = "Full";
            }
            else
            {
                $('#status_C').css("background-color","#fff");
                document.getElementById("counter_C").innerHTML = "";
            }
        // Chương trình xử lý hiển thị theo giá trị tag status_robot
        }
        else if(tag == "status_robot"){
            if(data == 0)
            document.getElementById(IOField).innerHTML = "ROBOT ĐANG Ở VỊ TRÍ HOME";
            else if(data == 1)
            document.getElementById(IOField).innerHTML = "ROBOT ĐANG NHẬN HÀNG Ở BĂNG TẢI NHẬP";
            else if(data == 2)
            document.getElementById(IOField).innerHTML = "ROBOT ĐANG DI CHUYỂN";
            else if(data == 3)
            document.getElementById(IOField).innerHTML = "ROBOT ĐANG GỬI HÀNG VÀO KHO "+$('#i3').val();
            else if(data == 4)
            document.getElementById(IOField).innerHTML = "ROBOT ĐANG VỀ VỊ TRÍ HOME";
            else if(data == 5)
            document.getElementById(IOField).innerHTML = "ROBOT ĐANG LẤY HÀNG Ở KHO "+$('#i3').val();
            else if(data == 6)
            document.getElementById(IOField).innerHTML = "ROBOT ĐANG ĐƯA HÀNG RA BĂNG TẢI XUẤT";
        }
        // Chương trình xử lý hiển thị vị trí robot
        else if(tag.substr(0,2) == "po")
        {
            temp = "";
            if(tofix == 0)
                document.getElementById(IOField).innerHTML = data;
            else
            {
                if(tag == "pos_x")
                {
                    data = - data;
                }
                document.getElementById(IOField).innerHTML = data.toFixed(tofix);
            }
            $('#p'+tag.substr(4,1)+'_range').val(data);
            if(tag == "pos_x")
                updateSlider(data);
            else if(tag == "pos_y")
            {
                updateSlider_child(data);
                updateSlider_1_child(data);
            }
            else if(tag == "pos_z")
                updateSlider_1(data);
        }
        // Chương trình xử lý khi quét được mã QR
        else if(tag == 'processed')
        {
            if(data == true & pl_done != data ){
                fn_Table01_SQL_Show();
            }
            pl_done = data;
        }
        else
        {
            if(tofix == 0)
                    document.getElementById(IOField).value = data * 5;
            else if(tofix != 0)
                document.getElementById(IOField).value = data.toFixed(tofix);
        }
    });
}
// HÀM CHỨC NĂNG HIỂN THỊ TRẠNG THÁI SYMBOL
function fn_SymbolStatus(ObjectID, SymName, Tag)
{
    if(ObjectID.substr(0,1) == "n") // Hiển thị trang thái ô hàng
    {
        socket.on(Tag, function(data){
            if (data == false)
                document.getElementById(ObjectID).classList.add('d-none');
            else if (data == true)
                document.getElementById(ObjectID).classList.remove('d-none');
        });
    }
    else if(ObjectID == "led_2")    //Led ON sáng và led OFF tắt khi tag = true và ngược lại
    {
        socket.on(Tag, function(data){
            if (data == false)
            {
                $("#led_2").css("background-color","#6c757d");
                if(l3 == false)
                    $("#led_1").css("background-color","red");
                l2 = false;
            }
            else if (data == true)
            {
                $("#led_2").css("background-color","green");
                $("#led_1").css("background-color","#6c757d");
                l2 = true;
            }

        });
    }
    else if(ObjectID == "led_3")    //Led TRIP sáng sau khi nhấn STOP (báo hiệu hệ thống dừng cuối quy trình)
    {
        socket.on(Tag, function(data){
            if (data == false)
            {
                $("#led_3").css("background-color","#6c757d");
                l3 = false;
            }
            else if (data == true)
            {
                $("#led_3").css("background-color","yellow");
                l3 = true;
            }

        });
    }
    else
    {
        var imglink_0 = "images/Symbol/" + SymName + "_0.png"; // Trạng thái tag = false
        var imglink_1 = "images/Symbol/" + SymName + "_1.png"; // Trạng thái tag = true
        // Chương trình hiển thị symbol theo trạng thái
        socket.on(Tag, function(data){
            if (data == false)
            {
                document.getElementById(ObjectID).src = imglink_0;
                if(ObjectID == 'led_dc_i' | ObjectID == 'led_dc_o')
                {

                }
                else
                {
                    if(Tag == 'dc_i' | Tag =='dc_o')
                    document.getElementById('mt'+ObjectID.substr(2,2)).classList.add('d-none');
                }
            }
            else if (data == true)
            {
                document.getElementById(ObjectID).src = imglink_1;
                if(ObjectID == 'led_dc_i' | ObjectID == 'led_dc_o')
                {
                    
                }
                else
                {
                    if(Tag =='dc_i' | Tag =='dc_o')
                        document.getElementById('mt'+ObjectID.substr(2,2)).classList.remove('d-none');
                }
            }
        });
    }
}
// HÀM YÊU CẦU DỮ LIỆU TỪ BẢNG SQL pre_data
function fn_Table01_SQL_Show(){
    socket.emit("msg_SQL_Show", "pre_data");
}
// HÀM XỬ LÝ SAU KHI NHẬN ĐƯỢC DỮ LIỆU BẢNG SQL TỪ SERVER
function fn_Table_SQL_show_pre_data()
{
    socket.on('SQL_Show_pre_data',function(data){
        if(sw2 == 0)        // nhập kho
            fn_table_01(data);
        if(sw2 == 1)        // xuất kho
            fn_table_02(data);
    }); 
}
// CHƯƠNG TRÌNH HIỂN THỊ DỮ LIỆU TỪ BẢNG pre_data KHI NHẬP (bảng chứa thông tin mã QR)
function fn_table_01(data){
    if(data){
        var check_empty = false;
        var qr_status = false;
        var len = data.length;
        if(len > 0){
            for(var i=0;i<len;i++){
                qr_status == false;
                if(data[i].QRCode == temp_qr)   // Nếu mã QR quét được trùng với mã được cung cấp
                {
                    tempArr[1] = temp_qr;
                    tempArr[2] = data[i].Name;
                    tempArr[3] = data[i].Type;
                    socket.emit('cmd_qr_dis',temp_qr);
                    socket.emit("cmd_name",data[i].Name);
                    socket.emit('cmd_type',data[i].Type);
                    qr_status = true;
                    user_viewer = false;
                    if($('#n'+(i+1)).hasClass('d-none'))   // Cho phép nhập khi ô còn trống
                    {
                        //Xác định nhập kho tự động hoặc bán tự động
                        if(sw == 0 & sw2 == 0) // bán tự động
                        {
                            $("#i1").val(temp_qr);
                            $("#i2").val(data[i].Name);
                            $("#i4").val(data[i].Type);
                            $('#pos_im').val("");
                            $("#i3").val("");
                            document.getElementById('gd_dk_1').classList.add('d-none');
                            if(data[i].Type == 'A')
                                document.getElementById("lb_import").innerHTML = "Loại A: {1 , 2 , 3 , 10 , 11 , 12}";
                            else if (data[i].Type == 'B')
                                document.getElementById("lb_import").innerHTML = "Loại B: {4 , 5 , 6 , 13 , 14 , 15}";
                            else if(data[i].Type == 'C')
                                document.getElementById("lb_import").innerHTML = "Loại C: {7 , 8 , 9 , 16 , 17 , 18}";
                            if(document.getElementById("access_user_control").checked)
                                document.getElementById('gd_dk_2').classList.remove('d-none');
                            step_process(2);
                        }
                        else if(sw == 1 & sw2 == 0)  //Tự động
                        {
                            socket.emit('cmd_pos', data[i].ID);
                            socket.emit('cmd_pos_enable',true);
                            setTimeout(function() {
                                socket.emit('cmd_pos_enable',false);
                            }, 1000);
                            tempArr[0] = data[i].ID;
                        }
                        tempArr[4] = "Nhập";
                        check_empty = true;
                        user_viewer = false;
                        break;
                    }
                }
            }
            if(qr_status == false)  //Chương trình xử lý khi không tra được mã QR
            {
                $("#i1").val(temp_qr);
                $("#i2").val("");
                $("#i3").val("");
                $("#i4").val("");
                if(fc_user == 'DieuKhien')
                {
                    if(logined == true)
                    {
                        setTimeout(function() {
                            alert('Mã QR không phù hợp, Đang yêu cầu xuất kho');
                        }, 500);
                    }
                    socket.emit('cmd_pos', '20');
                }
                else
                {
                    document.getElementById("nd_tb_viewer").innerHTML = "Mã QR không phù hợp, Đang yêu cầu xuất kho...";
                    user_viewer = true;
                }
            }
            else if(check_empty == false)   // Chương trình xử lý khi đầy hàng
            {
                setTimeout(function() {
                    if(fc_user == 'DieuKhien')
                    {
                        if(logined == true)
                        {
                            setTimeout(function() {
                                alert('Đầy hàng rồi loại '+ type_dis + ' .Đang yêu cầu xuất kho');
                            }, 500);
                        }
                        socket.emit('cmd_pos', '20');
                    }
                    else
                    {
                        document.getElementById("nd_tb_viewer").innerHTML = "Đầy hàng rồi loại " + type_dis + " .Đang yêu cầu xuất kho...";
                        user_viewer = true;
                    }
                    $("#i1").val(qrcode_dis);
                    $("#i2").val(name_dis);
                    $("#i4").val(type_dis);
                }, 1000);
            }
        }
    }   
}
// HIỂN THỊ DỮ LIỆU TỪ BẢNG pre_data KHI XUẤT
function fn_table_02(data){
    if(data){
        var len = data.length;
        var y = 0;
        var t = 0;
        if(len > 0){
            for(var i=0;i<len;i++){
                if(sw == 0)     //Bán tự động
                {
                    if(data[i].ID == Number(temp))
                    {
                        socket.emit('cmd_pos', temp);
                        socket.emit("cmd_name",data[i].Name);
                        socket.emit('cmd_type',data[i].Type);
                        socket.emit('cmd_qr_dis',data[i].QRCode);
                        socket.emit('cmd_pos_enable',true);
                        setTimeout(function() {
                            socket.emit('cmd_pos_enable',false);
                        }, 1000);
                        t = i;
                        y = 1;
                        break;
                    }
                }
                else            //tự động
                {
                    if(type == data[i].Type)
                    {
                        if(!($('#n'+data[i].ID).hasClass('d-none')))
                        {
                            socket.emit('cmd_pos', data[i].ID);
                            socket.emit('cmd_qr_dis',data[i].QRCode);
                            socket.emit("cmd_name",data[i].Name);
                            socket.emit('cmd_type',data[i].Type);
                            socket.emit('cmd_pos_enable',true);
                            setTimeout(function() {
                                socket.emit('cmd_pos_enable',false);
                            }, 1000);
                            t = i;
                            y = 1;
                            break;
                        }
                    }
                }
            }
            tempArr[0] = data[t].ID;
            tempArr[1] = data[t].QRCode;
            tempArr[2] = data[t].Name;
            tempArr[3] = data[t].Type;
            tempArr[4] = "Xuất";
            if(y == 0)
            {
                if(logined == true)
                {
                    setTimeout(function() {
                        alert('Hoàn thành xuất kho loại ' + type);
                    }, 3000);
                }

            }
        }
    }   
}
// HÀM YÊU CẦU DỮ LIỆU TỪ BẢNG SQL data (bảng chứa thông tin báo cáo sản xuất)
function fn_Table01_SQL_Show_data(){
    socket.emit("msg_SQL_Show", "data");
}
// HÀM XỬ LÝ SAU KHI NHẬN ĐƯỢC DỮ LIỆU BẢNG SQL TỪ SERVER
function fn_Table_SQL_show_data()
{
    socket.on('SQL_Show_data',function(data){
        fn_table_data(data);
    }); 
}
// HÀM HIỂN THỊ DỮ LIỆU ĐÃ NHẬP / XUẤT LÊN WEB
function fn_table_data(data){
    if(data){
        $("#table_data tbody").empty();
        var len = data.length;
        var txt = "<tbody>";
        if(len > 0){
            for(var i=(len-1);i>=0;i--){
                    txt += "<tr><td>"+data[i].date_time
                        +"</td><td>"+data[i].QR_Code
                        +"</td><td>"+data[i].Name
                        +"</td><td>"+data[i].Type
                        +"</td><td>"+data[i].Position
                        +"</td><td>"+data[i].Import_Export
                        +"</td></tr>";
                    }
            if(txt != ""){
            txt +="</tbody>"; 
            $("#table_data").append(txt);
            }
        }
    }   
}
// TÌM KIẾM SQL THEO KHOẢNG THỜI GIAN
function fn_SQL_By_Time()
{
    var val = [document.getElementById('dtpk_Search_Start').value,
               document.getElementById('dtpk_Search_End').value];
    if(val[0] == "" | val[1] == "")
        alert("Vui lòng điền đủ thông tin thời gian!");
    else
        socket.emit('msg_SQL_ByTime', val);
}
function fn_Show_SQL_By_Time()
{
    socket.on('SQL_ByTime', function(data){
        fn_table_data(data); // Show data
    });
}
// HÀM CHỨC NĂNG XUẤT DỮ LIỆU RA EXCEL
function fn_excel(){
    var linktext = "";
    var bookname = "";
    socket.emit("msg_Excel_Report", true);
}
function fn_excel_01(){
    socket.on('send_Excel_Report',function(data){
        linktext = data[0];
        bookname = data[1];
        // Delay save as
        var delayInMilliseconds = 1000;
        setTimeout(function() {
            saveAs(linktext, bookname);
        }, delayInMilliseconds);          
    }); 
}

// CÁC HÀM CẬP NHẤT VỊ TRÍ CỦA ROBOT LÊN GIAO DIỆN 2
function updateSlider(data) {
    var ratio;
    if(data>=0)
        ratio = (data - minValue) / (maxValue - minValue);
    else
        ratio = 0;
    const thumbPosition = ratio * (slider.offsetWidth - thumb.offsetWidth);
    thumb.style.left = `${thumbPosition}px`;
    slider.setAttribute('value', data);
}

function updateSlider_child(data) {
    var ratio_child;
    if(data>=0)
        ratio_child = (data - minValue_child) / (maxValue_child - minValue_child);
    else
        ratio_child = 0;
    const thumbPosition_child = ratio_child * (slider_child.offsetWidth - thumb_child.offsetWidth);
    thumb_child.style.left = `${thumbPosition_child}px`;
    slider_child.setAttribute('value', data);
}

function updateSlider_1(data) {
    var ratio_1;
    if(data>=0)
        ratio_1 = (data - minValue_1) / (maxValue_1 - minValue_1);
    else
        ratio_1 = 0;
    const thumbPosition_1 = ratio_1 * (slider_1.offsetWidth - thumb_1.offsetWidth);
    thumb_1.style.left = `${thumbPosition_1}px`;
    slider_1.setAttribute('value', data);
}

function updateSlider_1_child(data) {
    var ratio_1_child;
    if(data>=0)
        ratio_1_child = (data - minValue_1_child) / (maxValue_1_child - minValue_1_child);
    else
        ratio_1_child = 0;
    const thumbPosition_1_child = ratio_1_child * (slider_1_child.offsetWidth - thumb_1_child.offsetWidth);
    thumb_1_child.style.left = `${thumbPosition_1_child}px`;
    slider_1_child.setAttribute('value', data);
}
// HÀM HIỂN THỊ HOẠT ĐỘNG HỆ THỐNG ĐẾN MỌI NGƯỜI DÙNG
function fn_display_pos_after_xla(){
    socket.on('qr_dis',function(data){
        qrcode_dis = data;
    });
    socket.on('name',function(data){
        name_dis = data;
    });
    socket.on('send_pos',function(data){
        pos_dis = data;
    });
    socket.on('type',function(data){
        type_dis = data;
    });
    socket.on('sw_im_ex',function(data){
        if(data == false & pos_enable == true)
        {
            document.getElementById("nd_tb_viewer").innerHTML = "Đang nhập ô kho " + pos_dis +" ....";
            im_ex = false;
        }
        else if(data == true & pos_enable == true)
        {
            document.getElementById("nd_tb_viewer").innerHTML = "Đang xuất ô kho " + pos_dis +" ....";
            im_ex = true;
        }
    });
    socket.on('pos_enable',function(data){
        pos_enable = data;
        if(data == true)
        {
            $("#i1").val(qrcode_dis);
            $("#i2").val(name_dis);
            $("#i3").val(pos_dis);
            $("#i4").val(type_dis);
        }
    });
}
function data_fc(){
    socket.on('fc_user',function(data){
        fc_user = data;
    });
}
// Hàm chức năng của nút select_im
function select_im()
{
    // Chương trình kiểm tra ô đã nhập phù hợp với vùng được phấn hay chưa ?
    if(($('#pos_im').val() != "") & ($('#pos_im').val() > 0) & ($('#pos_im').val() < 19))
    {
        if ($('#n'+$('#pos_im').val()).hasClass('d-none'))
        {
            if(($('#i4').val() == "A" & ((1 <= $('#pos_im').val() & $('#pos_im').val() <= 3) || (10 <= $('#pos_im').val() & $('#pos_im').val() <= 12))) 
            || ($('#i4').val() == "B" & ((4 <= $('#pos_im').val() & $('#pos_im').val() <= 6) || (13 <= $('#pos_im').val() & $('#pos_im').val() <= 15))) 
            || ($('#i4').val() == "C" & ((7 <= $('#pos_im').val() & $('#pos_im').val() <= 9) || (16 <= $('#pos_im').val() & $('#pos_im').val() <= 18))))
            {
                var pos = $('#pos_im').val();
                socket.emit('cmd_pos', pos);
                socket.emit('cmd_pos_enable',true);
                setTimeout(function() {
                    socket.emit('cmd_pos_enable',false);
                }, 1000);
                tempArr[0] = pos;
                document.getElementById('gd_dk_1').classList.remove('d-none');
                document.getElementById('gd_dk_2').classList.add('d-none');
                step_process(100);
            }
            else
            {
                alert("Sai vị trí, vui lòng nhập lại!");
                $('#pos_im').val("");
            }
        }
        else
        {
            alert("Ô kho đã có hàng, vui lòng nhập lại!");
            $('#pos_im').val("");
        }
    }
    else
    {
        alert("Ô kho không tồn tại, vui lòng nhập lại!");
        $('#pos_im').val("");
    }
}
// Hàm chức năng của nút select_ex
function select_ex()
{
    if($('#pos_ex').val() == "")
        alert("Vui lòng nhập vị trí")
    else if ($('#n'+$('#pos_ex').val()).hasClass('d-none'))
    {
        $('#pos_ex').val("");
        alert("Ô hàng trống, vui lòng nhập lại!");
    }
    else
    {
        step_process(100);
        var pos = $('#pos_ex').val();
        temp = pos;
        document.getElementById('gd_dk_1').classList.remove('d-none');
        document.getElementById('gd_dk_3').classList.add('d-none');
        fn_Table01_SQL_Show();
    }
}

function step_process(data)
{
    step = data;
    if(data == 99)
        logined = true;
}
// Lắng nghe sự kiện nhấn ENTER
document.addEventListener("keypress", function(event){
    if (event.keyCode == 13 & step == 0)
        login();
    else if(event.keyCode == 13 & step == 1)
        select_ex();
    else if(event.keyCode == 13 & step == 2)
        select_im();
});
// CHƯƠNG TRÌNH RELOAD TRANG
function CallPageHome(){
    window.location.href = window.location.origin;
}
// CHƯƠNG TRÌNH XỬ LÝ STOP
function fn_process_stop(){
    socket.on('finished_1',function(data){
        if(data == true & finish_1_done != data)
        {
            $("#i1").val("");
            $("#i2").val("");
            $("#i3").val("");
            $("#i4").val("");
            socket.emit('cmd_pos', '0');
        }
        finish_1_done = data;
    });
    socket.on('clock_plc',function(data){
        status_plc = data;
    });
}

// Lặp lại việc mô phỏng kết nối PLC
setInterval(
    function(){
        socket.emit('cmd_status_plc',!status_plc);
        setTimeout(function() {
            checkStateChange(status_plc);
        }, 1000);
}, 1000);
// Hàm kiểm tra sự thay đổi trạng thái
function checkStateChange(data) 
{
    if (data == previousState) 
    {
        unchangedCounter = unchangedCounter + 1;
        if (unchangedCounter >= 5) 
        {
        // Hiển thị cảnh báo nếu không có sự thay đổi trong 2 giây
            console.log('mất kết nối plc');
            if(status_connect_plc == false)
            {
                $("#i1").val("");
                $("#i2").val("");
                $("#i3").val("");
                $("#i4").val("");
                document.getElementById('gd_dk_1').classList.add('d-none');
                document.getElementById('gd_dk_2').classList.add('d-none');
                document.getElementById('gd_dk_3').classList.add('d-none');
                document.getElementById('gd_dk_4').classList.add('d-none');
                document.getElementById("nd_tb").innerHTML = "Mất kết nối với PLC!";
                document.getElementById('gd_dk_5').classList.remove('d-none');
                enable_done_2 = false;
                status_connect_plc = true;
                test = false;
            }
        }
    } 
    else 
    {
        if(enable_done_2 == false)
        {
            $("#bt_import").css("background-color", "blue");
            $("#bt_export").css("background-color", "#6c757d");
            $("#mode_sa").css("background-color", "blue");
            $("#mode_a").css("background-color", "#6c757d");
            document.getElementById('gd_dk_1').classList.add('d-none');
            document.getElementById("nd_tb").innerHTML = "Vui lòng nhấn ON tại tủ điện để cho phép điều khiển!";
            document.getElementById('gd_dk_5').classList.remove('d-none');
            enable_done_2 = true;
            test = true;
        }
        status_connect_plc = false;
        unchangedCounter = 0;
        previousState = data;
    }
}