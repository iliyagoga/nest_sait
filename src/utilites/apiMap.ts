export const apiMap={
    host: 'http://192.168.1.117',
    port: '5000',
    auth: {
        way: '/user',
        reg: '/reg',
        login: '/login',
        checkToken:'/checkToken',
        updateUser: '/updateUser',
    },
    role: {
        way: '/role',
        checkRole: '/checkRole'
    },

    filters: {
        way: '/filters',
        getTags: '/getTags',
        getCountTags: '/getCountTags',
        createTag: '/createTag',
        redactTag: '/redactTag',
        countTags: '/countTags',
        removeTag: '/removeTag',
        getGroups: '/getGroups',
        getGroupsCountPages: '/getGroupsCountPages',
        createGroup: '/createGroup',
        renameGroup: '/renameGroup',
        removeGroup: '/removeGroup',
        getCategoriesByGroup: '/getCategoriesByGroup',
        createCategory: '/createCategory',
        removeCategory: '/removeCategory',
        getCategoriesCountPages: '/getCategoriesCountPages',
        renameCategory: '/renameCategory',
        getAllGroups: '/getAllGroups',
        getGroupsClient: '/getGroupsClient',
        getCategoriesClient: '/getCategoriesClient'
    },

    products:{
        way: '/products',
        getAttributes: '/getAttributes',
        getCountAttributePages:'/getCountAttributesPages',
        getAttributesValues: '/getAttributesValues',
        renameAttributeValue: '/renameAttributeValue',
        addAttributeValue: '/createAttributeValue',
        getCountAttributeValuesPages: '/getCountAttributeValuesPages',
        deleteAttributeValue: '/deleteAttributeValue',
        createAttribute: '/createAttribute',
        renameAttribute: '/renameAttribute',
        deleteAttribute: '/deleteAttribute',
        createProduct: '/createProduct',
        getProducts: '/getProducts',
        getProduct: '/getProduct',
        getPhotos:'/getPhotos',
        createGalleryProduct: '/createGalleryProduct',
        updateProduct: '/redactProduct',
        updateGalleryProduct: '/updateGalleryProduct',
        getProductCountPages: '/getProductCountPages',
        deleteProduct: '/deleteProduct',
        getProductsClientCats: '/getProductsClientCats',
        getProductsClient: '/getProductsClient'

    },

    cart:{
        way: '/cart',
        addToCart: '/addToCart',
        getCart:'/getCart',
        minusProduct: '/minusCount',
        plusProduct: '/plusCount',
        deleteProduct: '/removeFromCart',
        countAll: '/countAll'
    },
    coupons:{
        way: '/coupon',
        createCoupon: '/createCoupon',
        deleteCoupon: '/deleteCoupon',
        redactCoupon: '/createCoupon',
        getCoupons: '/getCoupons'
    }
}