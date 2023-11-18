
/**
 * Se puede crear mas menus para cada rol diferente.
 * El menu admin es el menu
 */

export class MenuUsers {

    public menuAdmin: any = [
        {
            titulo: 'General',
            icono: 'fa fa-home',
            id_class:'homeli',
            submenu: [
                {
                    titulo: 'Principal', url: 'home'
                },
                {
                    titulo: 'Perfil', url: 'user-profile'
                },
                {
                    titulo: 'Usuarios', url: 'list-users'
                }
            ]
        }, 
        // {
        //     titulo: 'Monitoreo Servicios',
        //     icono: 'fa fa-desktop',
        //     id_class:'formsli',
        //     submenu: [
        //         {
        //             titulo: 'Parques', url: 'services-park'
        //         },
        //         {
        //             titulo: 'Contenedores', url: 'services-conte'
        //         },
        //         {
        //             titulo: 'Equipos', url: 'services-equipo'
        //         }
        //     ]
        // }, 
        {
            titulo: 'Gestión Información',
            icono: 'fa fa-edit',
            id_class:'uielementsli',
            submenu: [
                {
                    titulo: 'Vehiculos', url: 'list-cars'
                },
                {
                    titulo: 'Tipo Datos', url: 'list-types-data'
                },
                {
                    titulo: 'Empresas', url: 'list-business'
                },
                {
                    titulo: 'Contenedores', url: 'list-containers'
                },
                {
                    titulo: 'Rutas', url: 'list-router-car'
                },
                {
                    titulo: 'Proceso de Reciclaje', url: 'list-recycling-process'
                }
            ]
        }, {
            titulo: 'Gestion Servicios',
            icono: 'fa fa-child',
            id_class:'tablesli',
            submenu: [
                {
                    titulo: 'Noticias', url: 'list-news'
                },
                {
                    titulo: 'Tramites', url: 'list-paperworks'
                }
            ]
        }, {
            titulo: 'Notificaciones',
            icono: 'fa fa-bell',
            id_class: 'datali',
            submenu: [
                {
                    titulo: 'Lista', url: 'list-notifications'
                },
                {
                    titulo: 'Ver Mapa', url: 'notifications-map'
                }
            ]
        }, {
            titulo: 'Estadisticas',
            icono: 'fa fa-bar-chart-o',
            id_class: 'layoutsli',
            submenu: [
                {
                    titulo: 'Reportes', url: 'reportes'
                }
            ]
        }
    ];

    public menuTecnico: any = [
        {
            titulo: 'General',
            icono: 'fa fa-home',
            id_class:'homeli',
            submenu: [
                {
                    titulo: 'Principal', url: 'home'
                },
                {
                    titulo: 'Perfil', url: 'user-profile'
                }
            ]
        }, 
        // {
        //     titulo: 'Monitoreo Servicios',
        //     icono: 'fa fa-desktop',
        //     id_class:'formsli',
        //     submenu: [
        //         {
        //             titulo: 'Parques', url: 'services-park'
        //         },
        //         {
        //             titulo: 'Contenedores', url: 'services-conte'
        //         },
        //         {
        //             titulo: 'Equipos', url: 'services-equipo'
        //         }
        //     ]
        // }, 
        {
            titulo: 'Gestión Información',
            icono: 'fa fa-edit',
            id_class:'uielementsli',
            submenu: [
                {
                    titulo: 'Vehiculos', url: 'list-cars'
                },
                {
                    titulo: 'Tipo Datos', url: 'list-types-data'
                },
                {
                    titulo: 'Empresas', url: 'list-business'
                },
                {
                    titulo: 'Contenedores', url: 'list-containers'
                },
                {
                    titulo: 'Rutas', url: 'list-router-car'
                },
                {
                    titulo: 'Proceso de Reciclaje', url: 'list-recycling-process'
                }
            ]
        }, {
            titulo: 'Gestion Servicios',
            icono: 'fa fa-child',
            id_class:'tablesli',
            submenu: [
                {
                    titulo: 'Noticias', url: 'list-news'
                },
                {
                    titulo: 'Tramites', url: 'list-paperworks'
                }
            ]
        }, {
            titulo: 'Notificaciones',
            icono: 'fa fa-bell',
            id_class: 'datali',
            submenu: [
                {
                    titulo: 'Lista', url: 'list-notifications'
                },
                {
                    titulo: 'Ver Mapa', url: 'notifications-map'
                }
            ]
        }, {
            titulo: 'Estadisticas',
            icono: 'fa fa-bar-chart-o',
            id_class: 'layoutsli',
            submenu: [
                {
                    titulo: 'Reportes', url: 'reportes'
                }
            ]
        }
    ];
    

}