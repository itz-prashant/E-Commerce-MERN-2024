import { BadgeCheck, LayoutDashboard, ShoppingBasket } from "lucide-react"

export const registerFormControls = [
    {
        name: 'userName',
        label: 'User Name',
        placeholder: 'Enter your user name',
        componentType: 'input',
        type: 'text'
    },
    {
        name: 'email',
        label: 'Email',
        placeholder: 'Enter your Email',
        componentType: 'input',
        type: 'email'
    },
    {
        name: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        componentType: 'input',
        type: 'password'
    },
]

export const loginFormControls = [
    {
        name: 'email',
        label: 'Email',
        placeholder: 'Enter your Email',
        componentType: 'input',
        type: 'email'
    },
    {
        name: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        componentType: 'input',
        type: 'password'
    }
]

export const adminSidebarMenuItems = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        path: '/admin/dashboard',
        icons: <LayoutDashboard />
    },
    {
        id: 'products',
        label: 'Products',
        path: '/admin/products',
        icons: <ShoppingBasket />
    },
    {
        id: 'orders',
        label: 'Orders',
        path: '/admin/orders',
        icons: <BadgeCheck />
    }
]

export const addProductFormElement = [
    {
        label: 'Title',
        name: 'title',
        componentType: 'input',
        type: 'text',
        placeholder: 'Enter product title',
    },
    {
        label: 'Description',
        name: 'description',
        componentType: 'textarea',
        placeholder: 'Enter product description',
    },
    {
        label: 'Category',
        name: 'category',
        componentType: 'select',
        options: [
            {id:"men", label:'Men'},
            {id:"women", label:'Women'},
            {id:"kids", label:'Kids'},
            {id:"accessories", label:'Accessories'},
            {id:"footwear", label:'Footwear'},
        ]
    },
    {
        label: 'Brand',
        name: 'brand',
        componentType: 'select',
        options: [
            {id:"nike", label:'Nike'},
            {id:"adidas", label:'Adidas'},
            {id:"puma", label:'Puma'},
            {id:"levi", label:"Levi's"},
            {id:"zara", label:'Zara'},
            {id:"h&m", label:'H&m'},
        ]
    },
    {
        label: 'Price',
        name: 'price',
        componentType: 'input',
        type: 'number',
        placeholder: 'Enter product price',
    },
    {
        label: 'Sale Price',
        name: 'salePrice',
        componentType: 'input',
        type: 'number',
        placeholder: 'Enter sale price (optional)',
    },
    {
        label: 'Total Stock',
        name: 'totalStock',
        componentType: 'input',
        type: 'number',
        placeholder: 'Enter total stock',
    },
]

export const shoppingViewHeaderMenuItem = [
    {
        id: 'home',
        label: 'Home',
        path: '/shop/home'
    },
    {
        id: 'products',
        label: 'Products',
        path: '/shop/listing'
    },
    {
        id: 'men',
        label: 'Men',
        path: '/shop/listing'
    },
    {
        id: 'women',
        label: 'Women',
        path: '/shop/listing'
    },
    {
        id: 'kids',
        label: 'Kids',
        path: '/shop/listing'
    },
    {
        id: 'footwear',
        label: 'Footwear',
        path: '/shop/listing'
    },
    {
        id: 'accessories',
        label: 'Accessories',
        path: '/shop/listing'
    },
]

export const filterOption = {
    category:  [
        {id:"men", label:'Men'},
        {id:"women", label:'Women'},
        {id:"kids", label:'Kids'},
        {id:"accessories", label:'Accessories'},
        {id:"footwear", label:'Footwear'},
    ],
    brand : [
        {id:"nike", label:'Nike'},
        {id:"adidas", label:'Adidas'},
        {id:"puma", label:'Puma'},
        {id:"levi", label:"Levi's"},
        {id:"zara", label:'Zara'},
        {id:"h&m", label:'H&m'},
    ]
}

export const sortOption = [
    {id: "price-lowtohigh", label: "Price Low To High"},
    {id: "price-hightolow", label: "Price High To Low"},
    {id: "title-atoz", label: "Title A To Z"},
    {id: "title-ztoa", label: "Title Z To A"},
]

export const addressFormControls = [
    {
        label: "Address",
        name: "address",
        componentType: "input",
        type: "text",
        placeholder: "Enter your address"
    },
    {
        label: "city",
        name: "city",
        componentType: "input",
        type: "text",
        placeholder: "Enter your city"
    },
    {
        label: "Pincode",
        name: "pincode",
        componentType: "input",
        type: "text",
        placeholder: "Enter your pincode"
    },
    {
        label: "Phone",
        name: "phone",
        componentType: "input",
        type: "text",
        placeholder: "Enter your phone"
    },
    {
        label: "Notes",
        name: "notes",
        componentType: "textarea",
        type: "text",
        placeholder: "Enter your notes"
    }
]