import MySQLdb   
import string   

def main(url_date, url_loc):
    m = MySQLdb.connect(host='127.0.0.1', user='root', passwd='0814', db='KICKRANI', charset='utf8')   
    c = m.cursor()   
    f = open("./list/timeline.txt",'r')   
    lines = f.readlines()   
    c.execute("SELECT * FROM detect_result")
    location_dicts = {
            0:"동국대학교 팔정도",
            1:"동국대학교 상록원",
            2:"동국대학교 신공학관 9층",
            3:"동국대학교 본관 앞"
        }

    for line in lines:  
        rr=line.split()
        log=str(rr[0])
        date=url_date
        value=str(rr[1])
        location=location_dicts[url_loc]
        sql = "INSERT INTO detect_result VALUES (%s, %s, %s, %s, %s)"
        values = ("0", log, value, date, location)
        c.execute(sql, values)
    m.commit()
    f.close()   
    m.close()  
