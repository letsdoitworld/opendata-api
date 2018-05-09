var dateFormat = require("dateFormat");
module.exports.convertReport = function (report, reportType) {
    let convertedReport = {
        type: reportType,
        lat: report.gps.lat,
        long: report.gps.long,
        //ts: new Date("%Y-%m-%d %H:%M:%S +Z"),
        ts: dateFormat(new Date(), "yyyy-mm-dd'T'HH:MM:ss'Z'hh"),
        source_id: report.id,
        country: ((report.gps.area!==null)?((report.gps.area.country!==null)?report.gps.area.country:null):null),
        admin_area: ((report.gps.area!==null)?((report.gps.area.aa1!==null)?report.gps.area.aa1:null):null),
        admin_sub_area: ((report.gps.area!==null)?((report.gps.area.aa2!==null)?report.gps.area.aa2:null):null),
        locality: ((report.gps.area!==null)?((report.gps.area.locality!==null)?report.gps.area.locality:null):null),
        status: (((report.status==='cleaned')||(report.status === 'confirmed'))?report.status.toUpperCase():"REPORTED"),
        household: ((report.types!==null)?(report.types.indexOf("domestic") > -1):false),
        construction: ((report.types!==null)?(report.types.indexOf("construction") > -1):false),
        hazardous: ((report.types!==null)?(report.types.indexOf("dangerous") > -1):false),
        bulky: ((report.types!==null)?((report.size === 'large') && ((report.types.indexOf("automotive") > -1)
            || (report.types.indexOf("electronic") > -1))):false),
        uncategorized: false,
        glass: ((report.types!==null)?((report.types!==null)?(report.types.indexOf("glass") > -1):false):false),
        plastic: ((report.types!==null)?(report.types.indexOf("plastic") > -1):false),
        textile: false,
        lumber: false,
        metal: ((report.types!==null)?(report.types.indexOf("metal") > -1):false),
        rubber: false,
        other: ((report.types!==null)?((report.types.indexOf("household") > -1) || (report.types.indexOf("electronic") > -1)
            || (report.types.indexOf("automotive") > -1) || (report.types.indexOf("liquid") > -1)):false),
        created_at: report.created,
        created_by: "Importer"
    };

    return convertedReport;
};
module.exports.convertListReports = function (reports, reportType) {
    //proekspert Importer logic
    let convertedReports = [];
    for (let i = 0; i < reports.length; i++) {
        if (reports[i].gps==null||reports[i].created==null||reports[i].gps.lat==null
            ||reports[i].gps.long==null||reports[i].id==null||reports[i].status==null) {
            continue;
        } else {
            convertedReports.push(exports.convertReport(reports[i], reportType));
    }
    }
    return convertedReports;
};