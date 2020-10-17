function getFileName(url) {
    var pos_l = url.lastIndexOf('/');
    var pos_r = url.lastIndexOf('.');
    return url.substring(pos_l+1,pos_r);
}
