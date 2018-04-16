module.exports.convertReports = function (reports, reportType) {
    //proekspert Importer logic
    let convertedReports = [];
    for (let i = 0; i < reports.length; i++) {
        if (reports[i].gps==null||reports[i].created==null||reports[i].gps.lat==null
            ||reports[i].gps.long==null||reports[i].id==null||reports[i].status==null) {
            continue;
        } else {
        let report = {
            type: reportType,
            lat: reports[i].gps.lat,
            long: reports[i].gps.long,
            ts: new Date("%Y-%m-%d %H:%M:%S +Z"),
            source_id: reports[i].id,
            country: (reports[i].gps.area.country!==null)?reports[i].gps.area.country:null,
            admin_area: (reports[i].gps.area.aa1!==null)?reports[i].gps.area.aa1:null,
            admin_sub_area: (reports[i].gps.area.aa2!==null)?reports[i].gps.area.aa2:null,
            locality: (reports[i].gps.area.locality!==null)?reports[i].gps.area.locality:null,
            status: (((reports[i].status==='cleaned')&&(reports[i].status === 'confirmed'))?reports[i].status:"reported"),
            household: ((reports[i].types!==null)?(reports[i].types.indexOf("someString") > -1):false),
            construction: ((reports[i].types!==null)?(reports[i].types.indexOf("construction") > -1):false),
            hazardous: ((reports[i].types!==null)?(reports[i].types.indexOf("dangerous") > -1):false),
            bulky: ((reports[i].types!==null)?((reports[i].size === 'large') && ((reports[i].types.indexOf("automotive") > -1)
                || (reports[i].types.indexOf("electronic") > -1))):false),
            uncategorized: false,
            glass: ((reports[i].types!==null)?((reports[i].types!==null)?(reports[i].types.indexOf("glass") > -1):false):false),
            plastic: ((reports[i].types!==null)?(reports[i].types.indexOf("plastic") > -1):false),
            textile: false,
            lumber: false,
            metal: ((reports[i].types!==null)?(reports[i].types.indexOf("metal") > -1):false),
            rubber: false,
            other: ((reports[i].types!==null)?((reports[i].types.indexOf("household") > -1) || (reports[i].types.indexOf("electronic") > -1)
                || (reports[i].types.indexOf("automotive") > -1) || (reports[i].types.indexOf("liquid") > -1)):false),
            created_at: Date(reports[i].created),
            created_by: "Importer"
        };
        convertedReports.push(report);
    }
    }
    return convertedReports;
};