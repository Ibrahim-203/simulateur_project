export var verifObligatory = (jc, action) => {
  /******************Verification des changes vides**********************/
  //Déclancheur
  jc.$content.find("form input").on(action, () => {
    var il_y_a_un_champ_vide = false;
    //Faire le tours de tout les classe .obligatoire
    //Debut boucle pour parcourir tous les champ avec la classe obligatoire
    jc.$content.find(".obligatoire").each((key, value) => {
      //Condition si il ya encore un champ vide
      if ($(value).val().trim() == "" || $(value).val().trim() == null) {
        //mettre le variable il_y_a_un_champ_vide à true
        il_y_a_un_champ_vide = true;
      }
    });
    //teste
    if (il_y_a_un_champ_vide === false) jc.buttons.valider.enable();
    else {
      jc.buttons.valider.disable();
    }
  });

};


let tableEquip;
let tableCat;
export let numberDayInMonth = {
  0: {
    libelle: "January",
    day: "31",
    ensoleillement: {
      ouest: {
        journaliere: '5.52',
        mensuel: '171.65',
      },
      est: {
        journaliere: '4.68',
        mensuel: '144.96',
      }
    }
  },
  1: {
    libelle: "February",
    day: "28",
    ensoleillement: {
      ouest: {
        journaliere: '6.19',
        mensuel: '179.69',
      },
      est: {
        journaliere: '4.63',
        mensuel: '134.18',
      }
    }
  }, 2: {
    libelle: "March",
    day: "31",
    ensoleillement: {
      ouest: {
        journaliere: '6.71',
        mensuel: '208',
      },
      est: {
        journaliere: '4.33',
        mensuel: '134.37',
      }
    }
  }, 3: {
    libelle: "April",
    day: "30",
    ensoleillement: {
      ouest: {
        journaliere: '6.68',
        mensuel: '200.51',
      },
      est: {
        journaliere: '4.23',
        mensuel: '126.98',
      }
    }
  }, 4: {
    libelle: "May",
    day: "31",
    ensoleillement: {
      ouest: {
        journaliere: '6.65',
        mensuel: '206.13',
      },
      est: {
        journaliere: '4.62',
        mensuel: '143.13',
      }
    }
  }, 5: {
    libelle: "June",
    day: "30",
    ensoleillement: {
      ouest: {
        journaliere: '6.28',
        mensuel: '188.5',
      },
      est: {
        journaliere: '3.47',
        mensuel: '103.96',
      }
    }
  }, 6: {
    libelle: "July",
    day: "31",
    ensoleillement: {
      ouest: {
        journaliere: '6.80',
        mensuel: '210.69',
      },
      est: {
        journaliere: '3.53',
        mensuel: '109.57',
      }
    }
  }, 7: {
    libelle: "August",
    day: "31",
    ensoleillement: {
      ouest: {
        journaliere: '7.24',
        mensuel: '224.42',
      },
      est: {
        journaliere: '5.32',
        mensuel: '164.95',
      }
    }
  }, 8: {
    libelle: "September",
    day: "30",
    ensoleillement: {
      ouest: {
        journaliere: '7.25',
        mensuel: '217.62',
      },
      est: {
        journaliere: '5.52',
        mensuel: '165.64',
      }
    }
  }, 9: {
    libelle: "October",
    day: "31",
    ensoleillement: {
      ouest: {
        journaliere: '6.85',
        mensuel: '212.36',
      },
      est: {
        journaliere: '4.86',
        mensuel: '150.67',
      }
    }
  }, 10: {
    libelle: "November",
    day: "30",
    ensoleillement: {
      ouest: {
        journaliere: '6.29',
        mensuel: '188.64',
      },
      est: {
        journaliere: '5.62',
        mensuel: '168.45',
      }
    }
  }, 11: {
    libelle: "December",
    day: "31",
    ensoleillement: {
      ouest: {
        journaliere: '5.64',
        mensuel: '174.72',
      },
      est: {
        journaliere: '4.72',
        mensuel: '146.26',
      }
    }
  }
}
export let loadCat = () => {
  $("#table_cat").DataTable().clear().destroy();

  tableCat = $("#table_cat").DataTable({
    lengthMenu: [5, 20, 50, 100, 200],
    fixedHeader: true,
  });

  $.ajax({
    url: "./model/php/DAOCat.php",
    dataType: "JSON",
    method: "POST",
    data: { SELECT_CAT: "SELECT_CAT" },
    success: function (response) {
      $.each(response, function (index, val) {
        let action = `<ul class="table-controls">
        <li><a href="javascript:void(0);" id="add_equip" class="bs-tooltip" data-id="${val.id}" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit"><i class="flaticon-plus-1  p-1 br-6 mb-1"></i></a></li>
          <li><a href="javascript:void(0);" id="edit_cat" class="bs-tooltip" data-id="${val.id}" data-libelle="${val.libelle_cat}" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit"><i class="flaticon-edit  p-1 br-6 mb-1"></i></a></li>
          <li><a href="javascript:void(0);" id="delete_cat" data-id="${val.id}" data-image="${val.image_cat}" data-libelle="${val.libelle_cat}" class="bs-tooltip" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete"><i class="flaticon-delete  p-1 br-6 mb-1"></i></a></li>
          </ul>`;

        tableCat.row.add([index + 1, val.libelle_cat, action]);
      });
      tableCat.draw();
    },
  });
};
export let loadEquip = () => {
  $("#table_equip").DataTable().clear().destroy();

  tableEquip = $("#table_equip").DataTable({
    lengthMenu: [5, 20, 50, 100, 200],
    fixedHeader: true,
  });

  $.ajax({
    url: "./model/php/DAOEquip.php",
    dataType: "JSON",
    method: "POST",
    data: { SELECT_EQUIP: "SELECT_EQUIP" },
    success: function (response) {
      $.each(response, function (index, val) {
        let action = `<ul class="table-controls">
          <li><a href="javascript:void(0);" id="edit_equip" class="bs-tooltip" data-id="${val.id}" data-libelle="${val.libelle_equip}" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit"><i class="flaticon-edit  p-1 br-6 mb-1"></i></a></li>
          <li><a href="javascript:void(0);" id="delete_equip" data-id="${val.id}" data-image="${val.image_equip}" data-libelle="${val.libelle_equip}" class="bs-tooltip" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete"><i class="flaticon-delete  p-1 br-6 mb-1"></i></a></li>
          </ul>`;

        tableEquip.row.add([
          index + 1,
          val.libelle_equip,
          val.puissance_equip + " W",
          val.libelle_cat,
          action,
        ]);
      });
      tableEquip.draw();
    },
  });
};
export let loadKit = (puissance_pan) => {
  $.ajax({
    url: "./model/php/DAOKit.php",
    dataType: "JSON",
    method: "POST",
    data: { SELECT_KIT: "SELECT_KIT" },
    success: function (response) {
      let Kits = "";
      $.each(response, function (index, val) {
        Kits += `<div class="col-xl-6 col-lg-6 col-md-6 layout-spacing">
        <div class="statbox widget box box-shadow">
            <div class="widget-content widget-content-area product-cat1">
                <div class="row mb-4">
                    <div class="col-xl-6 order-xl-1 col-lg-12 col-md-12 order-md-2 col-sm-6 order-sm-1 order-2">
                        <span class="badge badge-success">Sale</span>
                        <h5>Information</h5>
                        <h3 class="mb-4" style ="font-size: 20px">${val.libelle_kit}</h3>
                        <p>Onduleur :  ${val.marque_ond} ${val.tension_ond} V/${val.puissance_ond} Kva; 
                        Régulateur : ${val.marque_reg} ${val.tension_reg} V/${val.intensite_reg} A...
                        </p>
                        <a href="${val.lien_kit}" target="_blank"><button class="btn">Visiter le site</button></a>
                    </div>
                    <div
                        class="col-xl-6 order-xl-2 col-lg-12 col-md-12 order-md-1 col-sm-6 text-center order-sm-2 order-1 mb-sm-0 mb-4">
                        <img alt="image-product" src="${val.image_kit}" class="img-fluid">
                    </div>
                </div>
            </div>
        </div>
    </div>`;


      });
      $("#list_kit").html(Kits)
    },
  });

};
export let loadKitAdapte = (_puissance_pv, _intensite_reg, _puissance_ond, _capacite_batt, _tension_sys, _puissance_get_pann) => {
  $.ajax({
    url: "./admin/model/php/DAOKit.php",
    dataType: "JSON",
    async: false,
    method: "POST",
    data: { SELECT_KIT: "SELECT_KIT", _puissance_pv: _puissance_pv, _intensite_reg, _puissance_ond, _capacite_batt, _tension_sys },
    success: function (response) {
      let Kits = "";
      let val = response[0]
      _puissance_get_pann = val.puissance_pann
      Kits = `<div class="widget-content widget-content-area product-cat1">
                <div class="row mb-4">
                    <div class="col-xl-6 order-xl-1 col-lg-12 col-md-12 order-md-2 col-sm-6 order-sm-1 order-2">
                        <span class="badge badge-success">Disponible sur le site</span>
                        <h5>Information</h5>
                        <h3 class="mb-4" style ="font-size: 20px">${val.libelle_kit}</h3>
                        <p>Cliquez sur commander pour pour plus d'information sur le kit </p>
                        <a href="${val.lien_kit}" target="_blank"><button class="btn">Commander</button></a>
                    </div>
                    <div
                        class="col-xl-6 order-xl-2 col-lg-12 col-md-12 order-md-1 col-sm-6 text-center order-sm-2 order-1 mb-sm-0 mb-4">
                        <img alt="image-product" src="${val.image_kit}" class="img-fluid">
                    </div>
                </div>
            </div>`;
      $(".kit_adapte").html(Kits)
    },

  });

  console.log("_puissance_get_pann :", _puissance_get_pann);
};

export const chartJS = (_puissance_crete, _consommation, _location) => {
  let mois = numberDayInMonth
  let value = []
  console.log(_location);


  for (let i = 0; i < 12; i++) {
    if (_location == "Ouest") {
      console.log(mois[i].ensoleillement.ouest.mensuel);
      value.push((mois[i].ensoleillement.ouest.mensuel * _puissance_crete) / 1000)
    } else {
      console.log(mois[i].ensoleillement.est.mensuel);
      value.push((mois[i].ensoleillement.est.mensuel * _puissance_crete) / 1000)
    }

  }
  console.log(value);
  const labels = [
    'Janvier',
    'Fevrier',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Decembre',
  ];

  const data = {
    labels: labels,
    datasets: [{
      label: 'Energie produite par le kit (kwh)',
      data: value,
      backgroundColor: [
        'rgba(25, 250, 48, 0.2)'
      ],
      borderColor: [
        'rgb(25, 250, 48)',
      ],
      borderWidth: 1
    },
    {

      label: 'Consommation utilisateur (kwh)',
      data: _consommation,
      backgroundColor: [
        'rgba(0, 52, 229, 0.2)',
      ],
      borderColor: [
        'rgb(0, 52, 229)',
      ],
      borderWidth: 1
    }]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };

  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
  return myChart;
}
