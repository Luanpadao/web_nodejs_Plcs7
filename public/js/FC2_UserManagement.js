var a ="";
var b ="";
var userArr = [];
var num = 0;
var admin = false;
var lock_edit = false;
var stt_temp = 0;
var lock_mssv = true;
var stt_user;
var user_present;
$(document).ready(function(){
    fn_show_user_data();
    // fn_check_stt_user();
    //////////////////////////////////////////////////////bt_user_chuyen trang
    // $("#bt_user").click(function()
    // {
    //     if(stt_user != 0)
    //     {
    //         num = 5;
    //         document.getElementById('user_1').classList.remove('disabled');
    //         document.getElementById('user_2').classList.remove('disabled');
    //         document.getElementById('user_3').classList.remove('disabled');
    //         document.getElementById('user_4').classList.remove('disabled');
    //         socket.emit("msg_SQL_Show", "user_data");
    //     }
    // });
});
// Chương trình con
function login()
{
    a = document.getElementById("inputuser").value;
    b = document.getElementById("inputpass").value;
    if (a == "" | b == "")
    {
        alert('Vui lòng nhập đầy đủ thông tin');
    }
    else
    {
        num = 0;
        lock_edit = false;
        socket.emit("msg_SQL_Show", "user_data");
    }
}
function fn_bt_login()
{
    $("#inputuser").val("");
    $("#inputpass").val("");
}
function fn_user_number(data){
    // user_present = data;
    num = data;
    lock_edit = false;
    document.getElementById('user_1').classList.remove('disabled');
    document.getElementById('user_2').classList.remove('disabled');
    document.getElementById('user_3').classList.remove('disabled');
    document.getElementById('user_4').classList.remove('disabled');
    socket.emit("msg_SQL_Show", "user_data");
}
function fn_show_user_data()
{
    socket.on('SQL_Show_user_data',function(data){
        fn_user_data(data);
    });
}
function fn_user_data(data){
    if(data){
        var len = data.length;
        var check_wrong = true;
        if(len > 0){
            for(var i=0;i<len;i++){
                if(num == 0)
                {
                    if(data[i].user == a & data[i].pass == b)
                    {
                        setTimeout(function() {
                            alert("Xin chào " + data[i].name);
                        }, 200);
                        $("#ten_user").val(data[i].name);
                        $("#mssv_user").val(data[i].mssv);
                        $("#ns_user").val(data[i].Date_Of_Birth);
                        stt_temp = data[i].stt;
                        user_present = data[i].stt;
                        if(data[i].stt == 1)
                        {
                            lock_edit = true;
                            lock_mssv = false;
                        }
                        else
                            lock_mssv = true;
                        if(data[i].sex == "Nam")
                        {
                            document.getElementById("sex_user_nam").checked = true;
                            document.getElementById("sex_user_nu").checked = false;
                        }
                        else
                        {
                            document.getElementById("sex_user_nam").checked = false;
                            document.getElementById("sex_user_nu").checked = true;
                        }
                        $("#qq_user").val(data[i].address);
                        $("#email_user").val(data[i].email);
                        $("#user_user").val(data[i].user);
                        $("#pass_user").val(data[i].pass);
                        $("#pass_2_user").val(data[i].pass);
                        if(data[i].access == 'Toan quyen')
                        {
                            document.getElementById("access_user_admin").checked = true;
                            document.getElementById("access_user_control").checked = false;
                            document.getElementById("access_user_report").checked = false;
                            document.getElementById("access_user_viewer").checked = false;
                            document.getElementById('next_page').classList.remove('d-none');
                            document.getElementById('user_'+data[i].stt).classList.add('disabled');
                            admin = true;
                        }
                        else if(data[i].access == 'Dieu khien')
                        {
                            document.getElementById("access_user_admin").checked =false;
                            document.getElementById("access_user_control").checked = true;
                            document.getElementById("access_user_report").checked = false;
                            document.getElementById("access_user_viewer").checked = false;
                        }
                        else if(data[i].access == 'Bao cao')
                        {
                            document.getElementById("access_user_admin").checked =false;
                            document.getElementById("access_user_control").checked = false;
                            document.getElementById("access_user_report").checked = true;
                            document.getElementById("access_user_viewer").checked = false;
                        }
                        else if(data[i].access == 'Giam sat')
                        {
                            document.getElementById("access_user_admin").checked =false;
                            document.getElementById("access_user_control").checked = false;
                            document.getElementById("access_user_report").checked = false;
                            document.getElementById("access_user_viewer").checked = true;
                        }
                        bootstrap.Modal.getInstance(document.getElementById("myModal")).hide();
                        document.getElementById('bt_login').classList.add('d-none');
                        document.getElementById('bt_logout').classList.remove('d-none');
                        document.getElementById('bt_edit').classList.remove('d-none');
                        document.getElementById("inputuser").value = "";
                        document.getElementById("inputpass").value = "";
                        check_wrong = false;
                        break;
                    }
                }
                // else if (num == 5)
                // {
                //     if(stt_user == data[i].stt)
                //     {
                //         fn_sent_user_plc([data[i].access,data[i].stt]);
                //         $("#ten_user").val(data[i].name);
                //         $("#mssv_user").val(data[i].mssv);
                //         $("#ns_user").val(data[i].Date_Of_Birth);
                //         user_present = data[i].stt;
                //         stt_temp = data[i].stt;
                //         if(data[i].stt == 1)
                //         {
                //             lock_edit = true;
                //             lock_mssv = false;
                //         }
                //         else
                //             lock_mssv = true;
                //         if(data[i].sex == "Nam")
                //         {
                //             document.getElementById("sex_user_nam").checked = true;
                //             document.getElementById("sex_user_nu").checked = false;
                //         }
                //         else
                //         {
                //             document.getElementById("sex_user_nam").checked = false;
                //             document.getElementById("sex_user_nu").checked = true;
                //         }
                //         $("#qq_user").val(data[i].address);
                //         $("#email_user").val(data[i].email);
                //         $("#user_user").val(data[i].user);
                //         $("#pass_user").val(data[i].pass);
                //         $("#pass_2_user").val(data[i].pass);
                //         if(data[i].access == 'Toan quyen')
                //         {
                //             document.getElementById("access_user_admin").checked = true;
                //             document.getElementById("access_user_control").checked = false;
                //             document.getElementById("access_user_report").checked = false;
                //             document.getElementById('next_page').classList.remove('d-none');
                //             document.getElementById('user_'+data[i].stt).classList.add('disabled');
                //             admin = true;
                //         }
                //         else if(data[i].access == 'Dieu khien')
                //         {
                //             document.getElementById("access_user_admin").checked =false;
                //             document.getElementById("access_user_control").checked = true;
                //             document.getElementById("access_user_report").checked = false;
                //         }
                //         else
                //         {
                //             document.getElementById("access_user_admin").checked =false;
                //             document.getElementById("access_user_control").checked = false;
                //             document.getElementById("access_user_report").checked = true;
                //         }
                //         document.getElementById('bt_login').classList.add('d-none');
                //         document.getElementById('bt_logout').classList.remove('d-none');
                //         document.getElementById('bt_edit').classList.remove('d-none');
                //         check_wrong = false;
                //         break;
                //     }
                // }
                else
                {
                    if(num == data[i].stt)
                    {
                        $("#ten_user").val(data[i].name);
                        $("#mssv_user").val(data[i].mssv);
                        $("#ns_user").val(data[i].Date_Of_Birth);
                        user_present = data[i].stt;
                        stt_temp = data[i].stt;
                        if(data[i].stt == 1)
                            lock_edit = true;
                        if(data[i].sex == "Nam")
                        {
                            document.getElementById("sex_user_nam").checked = true;
                            document.getElementById("sex_user_nu").checked = false;
                        }
                        else
                        {
                            document.getElementById("sex_user_nam").checked = false;
                            document.getElementById("sex_user_nu").checked = true;
                        }
                        $("#qq_user").val(data[i].address);
                        $("#email_user").val(data[i].email);
                        $("#user_user").val(data[i].user);
                        $("#pass_user").val(data[i].pass);
                        $("#pass_2_user").val(data[i].pass);
                        if(data[i].access == 'Toan quyen')
                        {
                            document.getElementById("access_user_admin").checked = true;
                            document.getElementById("access_user_control").checked = false;
                            document.getElementById("access_user_report").checked = false;
                            document.getElementById("access_user_viewer").checked = false;
                        }
                        else if(data[i].access == 'Dieu khien')
                        {
                            document.getElementById("access_user_admin").checked =false;
                            document.getElementById("access_user_control").checked = true;
                            document.getElementById("access_user_report").checked = false;
                            document.getElementById("access_user_viewer").checked = false;
                        }
                        else if(data[i].access = 'Bao cao')
                        {
                            document.getElementById("access_user_admin").checked =false;
                            document.getElementById("access_user_control").checked = false;
                            document.getElementById("access_user_report").checked = true;
                            document.getElementById("access_user_viewer").checked = false;
                        }
                        else if(data[i].access = 'Giam sat')
                        {
                            document.getElementById("access_user_admin").checked =false;
                            document.getElementById("access_user_control").checked = false;
                            document.getElementById("access_user_report").checked = false;
                            document.getElementById("access_user_viewer").checked = true;
                        }
                        document.getElementById('user_'+data[i].stt).classList.add('disabled');
                        check_wrong = false;
                        break;
                    }
                }
            }
            if(check_wrong == true)
                alert('Sai thông tin tài khoản hoặc mật khẩu, vui lòng nhập lại!');
        }
    }
};
function login_num(data)
{

}
function logout()
{
    setTimeout(function() {
        alert("Đăng xuất thành công");
    }, 200);
    admin = false;
    $("#ten_user").val("");
    $("#mssv_user").val("");
    $("#ns_user").val("");
    document.getElementById("sex_user_nam").checked = false;
    document.getElementById("sex_user_nu").checked = false;
    $("#qq_user").val("");
    $("#email_user").val("");
    $("#user_user").val("");
    $("#pass_user").val("");
    document.getElementById("access_user_admin").checked = false;
    document.getElementById("access_user_control").checked = false;
    document.getElementById("access_user_report").checked = false;
    document.getElementById('bt_login').classList.remove('d-none');
    document.getElementById('bt_logout').classList.add('d-none');
    document.getElementById('bt_edit').classList.add('d-none');
    document.getElementById('bt_save').classList.add('d-none');
    document.getElementById('next_page').classList.add('d-none');
    document.getElementById("ten_user").disabled = true;
    document.getElementById("ns_user").disabled = true;
    document.getElementById("sex_user_nam").disabled = true;
    document.getElementById("sex_user_nu").disabled = true;
    document.getElementById("qq_user").disabled = true;
    document.getElementById("email_user").disabled = true;
    document.getElementById("user_user").disabled = true;
    document.getElementById("pass_user").disabled = true;
    document.getElementById("pass_2_user").disabled = true;
    document.getElementById("access_user_admin").disabled = true;
    document.getElementById("access_user_control").disabled = true;
    document.getElementById("access_user_report").disabled = true;
    $('#confirm_pass').addClass('d-none');
}
function fn_edit(){
    document.getElementById('bt_logout').classList.add('d-none');
    document.getElementById('bt_edit').classList.add('d-none');
    document.getElementById('bt_cancle').classList.remove('d-none');
    document.getElementById('bt_save').classList.remove('d-none');
    document.getElementById("ten_user").disabled = false;
    document.getElementById("ns_user").disabled = false;
    document.getElementById("sex_user_nam").disabled = false;
    document.getElementById("sex_user_nu").disabled = false;
    document.getElementById("qq_user").disabled = false;
    document.getElementById("email_user").disabled = false;
    document.getElementById("user_user").disabled = false;
    document.getElementById("pass_user").disabled = false;
    document.getElementById("pass_2_user").disabled = false;
    if(admin == true)
    {
        if(lock_edit == false)
        {
            document.getElementById("access_user_admin").disabled = false;
            document.getElementById("access_user_control").disabled = false;
            document.getElementById("access_user_report").disabled = false;
        }
        if(lock_mssv == false)
            document.getElementById("mssv_user").disabled = false;
    }
    $('#confirm_pass').removeClass('d-none');
}
function fn_save()
{
    if( $("#ten_user").val() == "" 
    | $("#ns_user").val()  == ""
    | (document.getElementById("sex_user_nam").checked == false & document.getElementById("sex_user_nu").checked == false) 
    | $("#qq_user").val() == ""
    | $("#email_user").val() == ""
    | $("#user_user").val() == ""
    | $("#pass_user").val() == ""
    | $("#pass_2_user").val() == "")
    {
        alert('Vui lòng điền đầy đủ thông tin!');
    }
    else if($("#pass_user").val() != $("#pass_2_user").val())
    {
        setTimeout(function() {
            alert('Sai mật khẩu xác nhận!');
        }, 200);
        $("#pass_2_user").val("");
    }
    else
    {
        setTimeout(function() {
            alert('Lưu thành công!');
        }, 500);
        userArr[0] = $("#ten_user").val();
        userArr[1] = $("#mssv_user").val();
        userArr[2] = $("#ns_user").val();
        if(document.getElementById("sex_user_nam").checked == true)
            userArr[3] = "Nam";
        else if(document.getElementById("sex_user_nu").checked == true)
            userArr[3] = "Nu";
        userArr[4] = $("#qq_user").val();
        userArr[5] = $("#email_user").val();
        userArr[6] = $("#user_user").val();
        userArr[7] = $("#pass_user").val();
        if(document.getElementById("access_user_admin").checked == true)
            userArr[8] = "Toan quyen";
        else if(document.getElementById("access_user_control").checked == true)
            userArr[8] = "Dieu khien";
        else if(document.getElementById("access_user_report").checked == true)
            userArr[8] = "Bao cao";
        userArr[9] = stt_temp;
        socket.emit('SQL_edit_data_user',userArr)
        document.getElementById('bt_edit').classList.remove('d-none');
        document.getElementById('bt_save').classList.add('d-none');
        document.getElementById('bt_cancle').classList.add('d-none');
        document.getElementById('bt_logout').classList.remove('d-none');
        document.getElementById("ten_user").disabled = true;
        document.getElementById("ns_user").disabled = true;
        document.getElementById("sex_user_nam").disabled = true;
        document.getElementById("sex_user_nu").disabled = true;
        document.getElementById("qq_user").disabled = true;
        document.getElementById("email_user").disabled = true;
        document.getElementById("user_user").disabled = true;
        document.getElementById("pass_user").disabled = true;
        document.getElementById("pass_2_user").disabled = true;
        document.getElementById("access_user_admin").disabled = true;
        document.getElementById("access_user_control").disabled = true;
        document.getElementById("access_user_report").disabled = true;
        document.getElementById("mssv_user").disabled = true;
        $('#confirm_pass').addClass('d-none');
    }

}
function fn_cancle(){
    document.getElementById('bt_edit').classList.remove('d-none');
        document.getElementById('bt_save').classList.add('d-none');
        document.getElementById('bt_cancle').classList.add('d-none');
        document.getElementById('bt_logout').classList.remove('d-none');
        document.getElementById("ten_user").disabled = true;
        document.getElementById("ns_user").disabled = true;
        document.getElementById("sex_user_nam").disabled = true;
        document.getElementById("sex_user_nu").disabled = true;
        document.getElementById("qq_user").disabled = true;
        document.getElementById("email_user").disabled = true;
        document.getElementById("user_user").disabled = true;
        document.getElementById("pass_user").disabled = true;
        document.getElementById("pass_2_user").disabled = true;
        document.getElementById("access_user_admin").disabled = true;
        document.getElementById("access_user_control").disabled = true;
        document.getElementById("access_user_report").disabled = true;
        document.getElementById("mssv_user").disabled = true;
        $('#confirm_pass').addClass('d-none');
}
function fn_user_next(){
    user_present = user_present + 1;
    if(user_present == 5)
        user_present = 1;
    fn_user_number(user_present);
}
function fn_user_pre(){
    user_present = user_present - 1;
    if(user_present == 0)
        user_present = 4;
    fn_user_number(user_present);
}