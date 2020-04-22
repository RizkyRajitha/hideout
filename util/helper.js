import {AsyncStorage} from 'react-native';
let timer = null;
import NetInfo from '@react-native-community/netinfo';
const API = 'https://gonotesrizky.herokuapp.com';

export const getofflinedata = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('data')
      .then((st) => {
        console.log('offline data helper');

        AsyncStorage.getItem('newofflinenotes')
          .then((offliennotes) => {
            console.log(' offline notes - ' + offliennotes);

            console.log(' synced notes -  ' + st);

            if (offliennotes) {
              var combine = [...JSON.parse(offliennotes), ...JSON.parse(st)];
            } else {
              var combine = [...JSON.parse(st)];
            }

            AsyncStorage.getItem('newofflineedits')
              .then((offlineedits) => {
                if (offlineedits) {
                  var paresedofflineedits = JSON.parse(offlineedits);

                  for (
                    let index = 0;
                    index < paresedofflineedits.length;
                    index++
                  ) {
                    const element = paresedofflineedits[index];
                    for (let index = 0; index < combine.length; index++) {
                      const element2 = combine[index];
                      if (element.id === element2.id) {
                        console.log(element.name + '  attached');
                        element2.note = element.note;
                        element2.updated = element.updated;
                        element2.title = element.title;
                      }
                    }
                  }
                }

                resolve(combine.reverse());
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });
};

export const handleCheck = () => {
  // Clears running timer and starts a new one each time the user types
  clearTimeout(timer);
  timer = setTimeout(() => {
    // this.toggleCheck();
    delayedSave();
    console.log('fire fire fire');
  }, 500);
};

const delayedSave = () => {
  AsyncStorage.getItem('newofflinenotes')
    .then((offliennotes) => {
      console.log('offline items to be uploaded - ' + JSON.parse(offliennotes));

      if (offliennotes) {
        AsyncStorage.getItem('jwt')
          .then((tk) => {
            // console.log(JSON.parse(offliennotes));
            console.log('len - ' + JSON.parse(offliennotes).length);
            var promisearr = [];
            JSON.parse(offliennotes).forEach((element) => {
              console.log(element);
              promisearr.push(
                fetch(`${API}/api/offlinesyncadd`, {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: tk,
                  },
                  body: JSON.stringify(element),
                }).then((res) => res.json()),
              );
            });

            Promise.all(promisearr)
              .then((alldata) => {
                console.log(alldata);

                AsyncStorage.removeItem('newofflinenotes').then((c) =>
                  console.log(
                    'donezooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo new itemmmmmmmmmmmmmmmm',
                  ),
                );
                // this.refresh();
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      } else {
        console.log('no uploads');
      }
    })
    .catch((err) => console.log(err));

  AsyncStorage.getItem('newofflineedits')
    .then((offlienedits) => {
      console.log('offline items to be uploaded - ' + JSON.parse(offlienedits));

      if (offlienedits) {
        AsyncStorage.getItem('jwt')
          .then((tk) => {
            // console.log(JSON.parse(offlienedits));
            console.log('len - ' + JSON.parse(offlienedits).length);
            var promisearr = [];
            JSON.parse(offlienedits).forEach((element) => {
              console.log(element);

              var vartemp = {
                noteid: element.id,
                note: element.note,
                title: element.title,
              };

              promisearr.push(
                fetch(`${API}/api/update`, {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: tk,
                  },
                  body: JSON.stringify(vartemp),
                }).then((res) => res.json()),
              );
            });

            Promise.all(promisearr)
              .then((alldata) => {
                console.log(alldata);

                AsyncStorage.removeItem('newofflineedits').then((c) =>
                  console.log(
                    'donezooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo editssssssssssssssssssssssssssss',
                  ),
                );
                // this.refresh();
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      } else {
        console.log('no uploads');
      }
    })
    .catch((err) => console.log(err));
};

export const handleCheckedit = (noteid, notec, offline, title) => {
  // Clears running timer and starts a new one each time the user types
  clearTimeout(timer);
  timer = setTimeout(() => {
    // this.toggleCheck();
    delayedSaveedit(noteid, notec, offline, title);
    console.log('fire fire fire');
  }, 500);
};

const delayedSaveedit = (noteid, notec, offline, title) => {
  NetInfo.fetch().then((state) => {
    if (state.isConnected) {
      console.log('online edit');
      var vartemp = {
        noteid: noteid,
        note: notec,
        title: title,
      };

      AsyncStorage.getItem('jwt')
        .then((tk) => {
          fetch(`${API}/api/update`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: tk,
            },
            body: JSON.stringify(vartemp),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => console.log(err));
    } else {
      console.log(noteid, notec, title);

      if (offline) {
        AsyncStorage.getItem('newofflinenotes')
          .then((offliennotes) => {
            var pareseofflien = JSON.parse(offliennotes);

            console.log('offline items to be uploaded - ' + pareseofflien);

            for (let index = 0; index < pareseofflien.length; index++) {
              const element = pareseofflien[index];

              if (element.id === noteid) {
                element.note = notec;
                element.updated = new Date().toISOString();
                element.title = title;
                break;
              }
            }

            AsyncStorage.setItem(
              'newofflinenotes',
              JSON.stringify(pareseofflien),
            ).then((s) => {
              console.log('added edit to async storage offline note &&& ');
            });
          })
          .catch((err) => console.log(err));
      } else {
        AsyncStorage.getItem('newofflineedits')
          .then((offlineedits) => {
            if (offlineedits) {
              var paresedofflineedits = JSON.parse(offlineedits);

              var found = false;

              for (let index = 0; index < paresedofflineedits.length; index++) {
                const element = paresedofflineedits[index];

                if (element.id === noteid) {
                  element.note = notec;
                  element.updated = new Date().toISOString();
                  element.title = title;
                  found = true;
                  break;
                }
              }

              if (found) {
                AsyncStorage.setItem(
                  'newofflineedits',
                  JSON.stringify(paresedofflineedits),
                ).then((s) => {
                  console.log(
                    'added edit to async storage update previous entry ',
                  );
                });
              } else {
                var temp = {
                  note: notec,
                  id: noteid,
                  title: title,
                  updated: new Date().toISOString(),
                };

                var strigifydata = [...paresedofflineedits, temp];
                AsyncStorage.setItem(
                  'newofflineedits',
                  JSON.stringify(strigifydata),
                ).then((s) => {
                  console.log('added edit to async storage new entry');
                });
              }
            } else {
              var temp = {
                note: notec,
                id: noteid,
                title: title,
                updated: new Date().toISOString(),
              };

              var strigifydata = [temp];
              AsyncStorage.setItem(
                'newofflineedits',
                JSON.stringify(strigifydata),
              ).then((s) => {
                console.log('added edit to async storage brand new');
              });
            }
          })
          .catch((err) => console.log(err));
      }
    }
  });
};
