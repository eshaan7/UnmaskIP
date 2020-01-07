''' src imports '''

from src import shodan_api

''' general imports '''

import pycountry

''' core '''


def getCountryName(cc):
    try:
        c = pycountry.countries.get(alpha_2=cc)
        return c.name
    except Exception as e:
        print("Error: Wrong Country Code / ", e)
        return None


def fetchIPInfo(ip_to_check):
    ipinfo = None
    result_dict = None

    # Check on Shodan.io
    try:
        ipinfo = shodan_api.host(ip_to_check)
        ipinfo['data'] = None
    except Exception as e:
        ipinfo = None
        print("No data found on shodan.")

    if ipinfo != None:
        cc = ipinfo['country_code']
        cn = getCountryName(cc)

        result_dict = {
            'ip': ip_to_check,
            'proxy_type': "VPN" if ('vpn' in ipinfo['tags']) else "PUB",
            'country_code': cc,
            'country_name': cn if cn else ipinfo['country_name'],
            "location": f"{round(ipinfo['latitude'], 2)},{round(ipinfo['longitude'], 2)}",
            'isp': ipinfo['isp'] if ipinfo['isp'] else None
            # "region": row["region"],
            # "city": row["city"],
            # 'domain': row["domain"],
            # 'used_as': ipinfo['tags'][0] if len(ipinfo['tags'])>0 else None,
            # 'as_no': ipinfo["as_no"],
            # 'as_name': ipinfo["as_name"]
        }

    else:
        print("Clean, hmm.")
        return None

    return result_dict


# email_contact = "eshaan7bansal@gmail.com"

# JS: el.tBodies[0].childNodes.forEach((d) => ll.push(d.childNodes[0].textContent))


# with open("Proxy List.txt") as f:
#     IP_list = f.read().splitlines()


# for i, ip_to_check in enumerate(IP_list):
#     try:
#         # how_bad_is_the_ip = requests.get(
#         #     f"http://check.getipintel.net/check.php?ip={ip_to_check}&contact={email_contact}&flags=m", timeout=7000).json()

#         # print(f"{i} | How bad?:{how_bad_is_the_ip}")

#         # if how_bad_is_the_ip >= 0.5:
#         i=i+1
#         fetchInfo(ip_to_check, i)
#     # else:
#         # print("Clean, hmm.")
#     except:
#         print("Exception raised | ", i)
#         continue
