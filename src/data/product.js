const items = {
  "success": true,
  "message": "Item list retrieved successfully",
  "data": [
    {
      "item_id": 1,
      "item_code": "MM20260001",
      "item_name": "Coca Cola",
      "unit_price": "1.20",
      "discount": "0.10",
      "category_id": 1,
      "brand_id": 1,
      "description": "Refreshing soft drink",
      "created_by": 1,
      "images": [
        {
          "image_id": 1,
          "image_name": "coke-can.jpg",
          "image_url": "https://www.coca-cola.com/content/dam/onexp/kh/en/brands/coca-cola/coca-cola-original-taste.png"
        }
      ],
      "attributes": [
        {
          "attr_name": "size",
          "attr_values": ["330ml"]
        }
      ]
    },

    {
      "item_id": 2,
      "item_code": "MM20260002",
      "item_name": "Pepsi",
      "unit_price": "1.10",
      "discount": "0.05",
      "category_id": 1,
      "brand_id": 2,
      "description": "Popular cola soft drink",
      "created_by": 1,
      "images": [
        {
          "image_id": 2,
          "image_name": "pepsi-can.jpg",
          "image_url": " https://www.kroger.com/product/images/large/front/0001200000013 "
        }
      ],
      "attributes": [
        {
          "attr_name": "size",
          "attr_values": ["330ml"]
        }
      ]
    },

    {
      "item_id": 3,
      "item_code": "MM20260003",
      "item_name": "Sprite",
      "unit_price": "1.10",
      "discount": "0.05",
      "category_id": 1,
      "brand_id": 1,
      "description": "Lemon-lime flavored soft drink",
      "created_by": 1,
      "images": [
        {
          "image_id": 3,
          "image_name": "sprite-can.jpg",
          "image_url": " https://www.coca-cola.com/content/dam/onexp/kh/en/brands/sprite/kh-en-sprite.png "
        }
      ],
      "attributes": [
        {
          "attr_name": "size",
          "attr_values": ["330ml"]
        }
      ]
    },

    {
      "item_id": 4,
      "item_code": "MM20260004",
      "item_name": "Fanta Orange",
      "unit_price": "1.10",
      "discount": "0.05",
      "category_id": 1,
      "brand_id": 1,
      "description": "Orange flavored soft drink",
      "created_by": 1,
      "images": [
        {
          "image_id": 4,
          "image_name": "fanta-orange.jpg",
          "image_url": " https://www.coca-cola.com/content/dam/onexp/gb/en/product/fanta-orange-2025.jpg "
        }
      ],
      "attributes": [
        {
          "attr_name": "size",
          "attr_values": ["330ml"]
        }
      ]
    },

    {
      "item_id": 5,
      "item_code": "MM20260005",
      "item_name": "Red Bull Energy Drink",
      "unit_price": "2.20",
      "discount": "0.15",
      "category_id": 2,
      "brand_id": 3,
      "description": "Energy drink that boosts performance",
      "created_by": 1,
      "images": [
        {
          "image_id": 5,
          "image_name": "redbull-can.jpg",
          "image_url": " https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtbC4M-BrhhBELR7cQmFsN2LW5xMpzJXQH2g&s "
        }
      ],
      "attributes": [
        {
          "attr_name": "size",
          "attr_values": ["250ml"]
        }
      ]
    },

    {
      "item_id": 6,
      "item_code": "MM20260006",
      "item_name": "Sting Energy Drink",
      "unit_price": "1.00",
      "discount": "0.05",
      "category_id": 2,
      "brand_id": 4,
      "description": "Popular energy drink in Southeast Asia",
      "created_by": 1,
      "images": [
        {
          "image_id": 6,
          "image_name": "sting-can.jpg",
          "image_url": " https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLAEQnc1qXHNmY05YLuWN05ylx7TaCTD_QSA&s "
        }
      ],
      "attributes": [
        {
          "attr_name": "size",
          "attr_values": ["330ml"]
        }
      ]
    },

    {
      "item_id": 7,
      "item_code": "MM20260007",
      "item_name": "Aquafina Water",
      "unit_price": "0.60",
      "discount": "0.00",
      "category_id": 3,
      "brand_id": 2,
      "description": "Pure drinking water",
      "created_by": 1,
      "images": [
        {
          "image_id": 7,
          "image_name": "aquafina-bottle.jpg",
          "image_url": " https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-8WywRnnXmzQ4w1rJxjiF2MvlYWIBx60M_A&s "
        }
      ],
      "attributes": [
        {
          "attr_name": "size",
          "attr_values": ["500ml"]
        }
      ]
    },

    {
      "item_id": 8,
      "item_code": "MM20260008",
      "item_name": "Dasani Water",
      "unit_price": "0.60",
      "discount": "0.00",
      "category_id": 3,
      "brand_id": 1,
      "description": "Clean and fresh bottled water",
      "created_by": 1,
      "images": [
        {
          "image_id": 8,
          "image_name": "dasani-bottle.jpg",
          "image_url": " https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRManhkRZnygtRfkysygBji14finjW8UfRRIw&s "
        }
      ],
      "attributes": [
        {
          "attr_name": "size",
          "attr_values": ["500ml"]
        }
      ]
    },

    {
      "item_id": 9,
      "item_code": "MM20260009",
      "item_name": "Pocari Sweat",
      "unit_price": "1.30",
      "discount": "0.05",
      "category_id": 4,
      "brand_id": 5,
      "description": "Ion supply sports drink",
      "created_by": 1,
      "images": [
        {
          "image_id": 9,
          "image_name": "pocari-bottle.jpg",
          "image_url": " https://trypocari.com/cdn/shop/files/product-image01_1000x1000.webp?v=1697081207 "
        }
      ],
      "attributes": [
        {
          "attr_name": "size",
          "attr_values": ["500ml"]
        }
      ]
    },

    {
      "item_id": 10,
      "item_code": "MM20260010",
      "item_name": "Vimto Energy",
      "unit_price": "1.00",
      "discount": "0.05",
      "category_id": 5,
      "brand_id": 6,
      "description": "Refreshing bottled green tea",
      "created_by": 1,
      "images": [
        {
          "image_id": 10,
          "image_name": "ice-green-tea.jpg",
          "image_url": " https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKSYFWN_ZWXiyRh_UhZgGQ6Ki3F_-ivOVk7Q&s "
        }
      ],
      "attributes": [
        {
          "attr_name": "size",
          "attr_values": ["500ml"]
        }
      ]
    },

    {
      "item_id": 11,
      "item_code": "MM20260011",
      "item_name": "Minute Maid Orange Juice",
      "unit_price": "1.50",
      "discount": "0.10",
      "category_id": 6,
      "brand_id": 1,
      "description": "100% orange juice drink",
      "created_by": 1,
      "images": [
        {
          "image_id": 11,
          "image_name": "minute-maid-orange.jpg",
          "image_url": " https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2SjKc0KyDYr4LTzCvS6wfo4VINW2yRSRXpw&s "
        }
      ],
      "attributes": [
        {
          "attr_name": "size",
          "attr_values": ["350ml"]
        }
      ]
    },
        {
      "item_id": 21,
      "item_code": "FM20260001",
      "item_name": "Instant Noodles (Cup)",
      "unit_price": "1.00",
      "discount": "0.05",
      "category_id": 2,
      "brand_id": 10,
      "description": "Quick and easy instant cup noodles",
      "created_by": 1,
      "images": [
        {
          "image_id": 21,
          "image_name": "instant-noodle-cup.jpg",
          "image_url": " https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhokvpmG8FyV9a8hGrtG1P__KK2SPCZTafHA&s"
        }
      ],
      "attributes": [
        {
          "attr_name": "flavor",
          "attr_values": ["Chicken"]
        }
      ]
    },

    {
      "item_id": 22,
      "item_code": "FM20260002",
      "item_name": "Potato Chips",
      "unit_price": "1.50",
      "discount": "0.10",
      "category_id": 2,
      "brand_id": 11,
      "description": "Crispy salted potato chips",
      "created_by": 1,
      "images": [
        {
          "image_id": 22,
          "image_name": "potato-chips.jpg",
          "image_url": " https://i5.walmartimages.com/seo/Lay-s-Classic-Potato-Chips-8-oz-Bag_e70f0cde-0b6e-4f9f-8065-d69d978ef4d5.83023b06298d808e46ee6358d03daf3d.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF "
        }
      ],
      "attributes": [
        {
          "attr_name": "size",
          "attr_values": ["60g"]
        }
      ]
    },

    {
      "item_id": 23,
      "item_code": "FM20260003",
      "item_name": "White Bread",
      "unit_price": "1.30",
      "discount": "0.05",
      "category_id": 2,
      "brand_id": 12,
      "description": "Soft sliced white bread",
      "created_by": 1,
      "images": [
        {
          "image_id": 23,
          "image_name": "white-bread.jpg",
          "image_url": " https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZSj2P9362mTkUM_Vp3ZuKvv0d_qGYQG_21Q&s "
        }
      ],
      "attributes": [
        {
          "attr_name": "weight",
          "attr_values": ["400g"]
        }
      ]
    },

    {
      "item_id": 24,
      "item_code": "FM20260004",
      "item_name": "Chocolate Bar",
      "unit_price": "0.90",
      "discount": "0.05",
      "category_id": 2,
      "brand_id": 13,
      "description": "Milk chocolate bar",
      "created_by": 1,
      "images": [
        {
          "image_id": 24,
          "image_name": "chocolate-bar.jpg",
          "image_url": " https://allboxedout.com/cdn/shop/products/ac16e9f2-0f77-46b6-957d-f44c6709fd21_c07a86b2-7bec-4b98-a6c1-bd3aa0136640.jpg?v=1621904933&width=1946 "
        }
      ],
      "attributes": [
        {
          "attr_name": "weight",
          "attr_values": ["45g"]
        }
      ]
    },

    {
      "item_id": 25,
      "item_code": "FM20260005",
      "item_name": "Biscuits",
      "unit_price": "1.20",
      "discount": "0.05",
      "category_id": 2,
      "brand_id": 14,
      "description": "Sweet and crunchy biscuits",
      "created_by": 1,
      "images": [
        {
          "image_id": 25,
          "image_name": "biscuits.jpg",
          "image_url": " https://shalimarplasticindustries.com/wp-content/uploads/2019/07/Biscuits-Trays4.jpg "
        }
      ],
      "attributes": [
        {
          "attr_name": "flavor",
          "attr_values": ["Original"]
        }
      ]
    },

    {
      "item_id": 26,
      "item_code": "FM20260006",
      "item_name": "Canned Sardines",
      "unit_price": "1.80",
      "discount": "0.10",
      "category_id": 2,
      "brand_id": 15,
      "description": "Sardines in tomato sauce",
      "created_by": 1,
      "images": [
        {
          "image_id": 26,
          "image_name": "canned-sardines.jpg",
          "image_url": " https://m.media-amazon.com/images/I/91GMOkIIz+L._AC_UF894,1000_QL80_.jpg "
        }
      ],
      "attributes": [
        {
          "attr_name": "net_weight",
          "attr_values": ["155g"]
        }
      ]
    },

    {
      "item_id": 27,
      "item_code": "FM20260007",
      "item_name": "Instant Rice",
      "unit_price": "1.40",
      "discount": "0.05",
      "category_id": 2,
      "brand_id": 16,
      "description": "Ready-to-eat instant rice",
      "created_by": 1,
      "images": [
        {
          "image_id": 27,
          "image_name": "instant-rice.jpg",
          "image_url": " https://www.foodandwine.com/thmb/KvjRyxP63T5J_Sy7exw36yS0eAg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/minute-rice-midwestern-culture-FT-BLOG0521-bd5ba41650bc4e24b5b5a74bc6315295.jpg "
        }
      ],
      "attributes": [
        {
          "attr_name": "weight",
          "attr_values": ["200g"]
        }
      ]
    },

    {
      "item_id": 28,
      "item_code": "FM20260008",
      "item_name": "Canned Sweet Corn",
      "unit_price": "1.10",
      "discount": "0.05",
      "category_id": 2,
      "brand_id": 17,
      "description": "Sweet corn kernels in can",
      "created_by": 1,
      "images": [
        {
          "image_id": 28,
          "image_name": "sweet-corn.jpg",
          "image_url": " https://image.made-in-china.com/2f0j00ZtqBHoPdEfbM/Factory-Price-New-Crop-Season-Canned-Sweet-Corn.webp "
        }
      ],
      "attributes": [
        {
          "attr_name": "net_weight",
          "attr_values": ["180g"]
        }
      ]
    },

    {
      "item_id": 29,
      "item_code": "FM20260009",
      "item_name": "Cup Porridge",
      "unit_price": "1.00",
      "discount": "0.05",
      "category_id": 2,
      "brand_id": 18,
      "description": "Instant rice porridge",
      "created_by": 1,
      "images": [
        {
          "image_id": 29,
          "image_name": "cup-porridge.jpg",
          "image_url": " https://jgsj.jayagrocer.com/cdn/shop/files/053724-1-1_ebed92ab-1ef6-4110-8efb-c2629e4ed6e0.jpg?v=1756458880 "
        }
      ],
      "attributes": [
        {
          "attr_name": "flavor",
          "attr_values": ["Pork"]
        }
      ]
    },

    {
      "item_id": 30,
      "item_code": "FM20260010",
      "item_name": "Frozen Sausage",
      "unit_price": "2.50",
      "discount": "0.20",
      "category_id": 2,
      "brand_id": 19,
      "description": "Frozen pork sausage",
      "created_by": 1,
      "images": [
        {
          "image_id": 30,
          "image_name": "frozen-sausage.jpg",
          "image_url": " https://static.vecteezy.com/system/resources/previews/010/713/408/large_2x/closeup-frozen-sausage-in-plastic-bag-with-ice-crystals-isolated-on-white-background-photo.jpg "
        }
      ],
      "attributes": [
        {
          "attr_name": "weight",
          "attr_values": ["500g"]
        }
      ]
    },
    {
      "item_id": 51,
      "item_code": "FR20260001",
      "item_name": "Frozen Chicken Nuggets",
      "unit_price": "3.00",
      "discount": "0.15",
      "category_id": 7,
      "brand_id": 36,
      "description": "Crispy frozen chicken nuggets",
      "created_by": 1,
      "images": [
        {
          "image_id": 51,
          "image_name": "chicken-nuggets.jpg",
          "image_url": " https://tse3.mm.bing.net/th/id/OIP.c8v6zKwcRfjxfWkfo-f0GgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
        }
      ],
      "attributes": [
        { "attr_name": "weight", "attr_values": ["500g"] }
      ]
    },

    {
      "item_id": 52,
      "item_code": "FR20260002",
      "item_name": "Frozen Dumplings",
      "unit_price": "2.80",
      "discount": "0.10",
      "category_id": 7,
      "brand_id": 37,
      "description": "Frozen pork dumplings",
      "created_by": 1,
      "images": [
        {
          "image_id": 52,
          "image_name": "dumplings.jpg",
          "image_url": "https://www.cjfoods.com/images/dumplings.png"
        }
      ],
      "attributes": [
        { "attr_name": "weight", "attr_values": ["400g"] }
      ]
    },

    {
      "item_id": 53,
      "item_code": "FR20260003",
      "item_name": "Frozen Fish Balls",
      "unit_price": "2.20",
      "discount": "0.10",
      "category_id": 7,
      "brand_id": 38,
      "description": "Frozen fish balls",
      "created_by": 1,
      "images": [
        {
          "image_id": 53,
          "image_name": "fish-balls.jpg",
          "image_url": "https://www.fishball.com/images/fishball.png"
        }
      ],
      "attributes": [
        { "attr_name": "weight", "attr_values": ["500g"] }
      ]
    },

    {
      "item_id": 54,
      "item_code": "FR20260004",
      "item_name": "Frozen French Fries",
      "unit_price": "2.50",
      "discount": "0.10",
      "category_id": 7,
      "brand_id": 39,
      "description": "Frozen potato fries",
      "created_by": 1,
      "images": [
        {
          "image_id": 54,
          "image_name": "french-fries.jpg",
          "image_url": "https://www.mccain.com/images/fries.png"
        }
      ],
      "attributes": [
        { "attr_name": "weight", "attr_values": ["1kg"] }
      ]
    },

    {
      "item_id": 55,
      "item_code": "FR20260005",
      "item_name": "Frozen Sausage",
      "unit_price": "3.20",
      "discount": "0.15",
      "category_id": 7,
      "brand_id": 40,
      "description": "Frozen pork sausage",
      "created_by": 1,
      "images": [
        {
          "image_id": 55,
          "image_name": "frozen-sausage.jpg",
          "image_url": "https://www.johnsonville.com/images/products/bratwurst.png"
        }
      ],
      "attributes": [
        { "attr_name": "weight", "attr_values": ["500g"] }
      ]
    },
    {
      "item_id": 56,
      "item_code": "FF20260001",
      "item_name": "Tomato",
      "unit_price": "0.80",
      "discount": "0.00",
      "category_id": 8,
      "brand_id": 41,
      "description": "Fresh red tomatoes",
      "created_by": 1,
      "images": [
        {
          "image_id": 56,
          "image_name": "tomato.jpg",
          "image_url": "https://www.freshproduce.com/images/tomato.png"
        }
      ],
      "attributes": [
        { "attr_name": "unit", "attr_values": ["1kg"] }
      ]
    },

    {
      "item_id": 57,
      "item_code": "FF20260002",
      "item_name": "Cabbage",
      "unit_price": "0.70",
      "discount": "0.00",
      "category_id": 8,
      "brand_id": 41,
      "description": "Fresh green cabbage",
      "created_by": 1,
      "images": [
        {
          "image_id": 57,
          "image_name": "cabbage.jpg",
          "image_url": "https://www.freshproduce.com/images/cabbage.png"
        }
      ],
      "attributes": [
        { "attr_name": "unit", "attr_values": ["1pc"] }
      ]
    },

    {
      "item_id": 58,
      "item_code": "FF20260003",
      "item_name": "Banana",
      "unit_price": "0.60",
      "discount": "0.00",
      "category_id": 8,
      "brand_id": 41,
      "description": "Fresh bananas",
      "created_by": 1,
      "images": [
        {
          "image_id": 58,
          "image_name": "banana.jpg",
          "image_url": "https://www.freshproduce.com/images/banana.png"
        }
      ],
      "attributes": [
        { "attr_name": "unit", "attr_values": ["1kg"] }
      ]
    },

    {
      "item_id": 59,
      "item_code": "FF20260004",
      "item_name": "Apple",
      "unit_price": "1.20",
      "discount": "0.05",
      "category_id": 8,
      "brand_id": 41,
      "description": "Fresh red apples",
      "created_by": 1,
      "images": [
        {
          "image_id": 59,
          "image_name": "apple.jpg",
          "image_url": "https://www.freshproduce.com/images/apple.png"
        }
      ],
      "attributes": [
        { "attr_name": "unit", "attr_values": ["1kg"] }
      ]
    },

    {
      "item_id": 60,
      "item_code": "FF20260005",
      "item_name": "Orange",
      "unit_price": "1.00",
      "discount": "0.05",
      "category_id": 8,
      "brand_id": 41,
      "description": "Fresh oranges",
      "created_by": 1,
      "images": [
        {
          "image_id": 60,
          "image_name": "orange.jpg",
          "image_url": "https://www.freshproduce.com/images/orange.png"
        }
      ],
      "attributes": [
        { "attr_name": "unit", "attr_values": ["1kg"] }
      ]
    },
    {
      "item_id": 61,
      "item_code": "MS20260001",
      "item_name": "Pork Meat",
      "unit_price": "3.50",
      "discount": "0.10",
      "category_id": 9,
      "brand_id": 42,
      "description": "Fresh pork meat",
      "created_by": 1,
      "images": [
        {
          "image_id": 61,
          "image_name": "pork.jpg",
          "image_url": "https://www.meatmarket.com/images/pork.png"
        }
      ],
      "attributes": [
        { "attr_name": "unit", "attr_values": ["1kg"] }
      ]
    },

    {
      "item_id": 62,
      "item_code": "MS20260002",
      "item_name": "Chicken Meat",
      "unit_price": "3.00",
      "discount": "0.10",
      "category_id": 9,
      "brand_id": 42,
      "description": "Fresh chicken meat",
      "created_by": 1,
      "images": [
        {
          "image_id": 62,
          "image_name": "chicken.jpg",
          "image_url": "https://www.meatmarket.com/images/chicken.png"
        }
      ],
      "attributes": [
        { "attr_name": "unit", "attr_values": ["1kg"] }
      ]
    },

    {
      "item_id": 63,
      "item_code": "MS20260003",
      "item_name": "Fresh Fish",
      "unit_price": "3.80",
      "discount": "0.10",
      "category_id": 9,
      "brand_id": 43,
      "description": "Fresh river fish",
      "created_by": 1,
      "images": [
        {
          "image_id": 63,
          "image_name": "fish.jpg",
          "image_url": "https://www.seafoodmarket.com/images/fish.png"
        }
      ],
      "attributes": [
        { "attr_name": "unit", "attr_values": ["1kg"] }
      ]
    },

    {
      "item_id": 64,
      "item_code": "MS20260004",
      "item_name": "Shrimp",
      "unit_price": "4.20",
      "discount": "0.15",
      "category_id": 9,
      "brand_id": 43,
      "description": "Fresh shrimp",
      "created_by": 1,
      "images": [
        {
          "image_id": 64,
          "image_name": "shrimp.jpg",
          "image_url": "https://www.seafoodmarket.com/images/shrimp.png"
        }
      ],
      "attributes": [
        { "attr_name": "unit", "attr_values": ["1kg"] }
      ]
    },

    {
      "item_id": 65,
      "item_code": "MS20260005",
      "item_name": "Squid",
      "unit_price": "4.00",
      "discount": "0.15",
      "category_id": 9,
      "brand_id": 43,
      "description": "Fresh squid",
      "created_by": 1,
      "images": [
        {
          "image_id": 65,
          "image_name": "squid.jpg",
          "image_url": "https://www.seafoodmarket.com/images/squid.png"
        }
      ],
      "attributes": [
        { "attr_name": "unit", "attr_values": ["1kg"] }
      ]
    },
    {
      "item_id": 66,
      "item_code": "BK20260001",
      "item_name": "White Bread",
      "unit_price": "1.30",
      "discount": "0.05",
      "category_id": 10,
      "brand_id": 44,
      "description": "Soft white bread",
      "created_by": 1,
      "images": [
        {
          "image_id": 66,
          "image_name": "white-bread.jpg",
          "image_url": "https://www.wonderbread.com/images/bread.png"
        }
      ],
      "attributes": [
        { "attr_name": "weight", "attr_values": ["400g"] }
      ]
    },

    {
      "item_id": 67,
      "item_code": "BK20260002",
      "item_name": "Whole Wheat Bread",
      "unit_price": "1.50",
      "discount": "0.05",
      "category_id": 10,
      "brand_id": 44,
      "description": "Healthy whole wheat bread",
      "created_by": 1,
      "images": [
        {
          "image_id": 67,
          "image_name": "wheat-bread.jpg",
          "image_url": "https://www.wonderbread.com/images/wheat.png"
        }
      ],
      "attributes": [
        { "attr_name": "weight", "attr_values": ["400g"] }
      ]
    },

    {
      "item_id": 68,
      "item_code": "BK20260003",
      "item_name": "Cake Slice",
      "unit_price": "1.80",
      "discount": "0.10",
      "category_id": 10,
      "brand_id": 45,
      "description": "Chocolate cake slice",
      "created_by": 1,
      "images": [
        {
          "image_id": 68,
          "image_name": "cake.jpg",
          "image_url": "https://www.cakeshop.com/images/cake.png"
        }
      ],
      "attributes": [
        { "attr_name": "flavor", "attr_values": ["Chocolate"] }
      ]
    },

    {
      "item_id": 69,
      "item_code": "BK20260004",
      "item_name": "Croissant",
      "unit_price": "1.20",
      "discount": "0.05",
      "category_id": 10,
      "brand_id": 45,
      "description": "Butter croissant",
      "created_by": 1,
      "images": [
        {
          "image_id": 69,
          "image_name": "croissant.jpg",
          "image_url": "https://www.cakeshop.com/images/croissant.png"
        }
      ],
      "attributes": [
        { "attr_name": "type", "attr_values": ["Butter"] }
      ]
    },

    {
      "item_id": 70,
      "item_code": "BK20260005",
      "item_name": "Donut",
      "unit_price": "1.00",
      "discount": "0.05",
      "category_id": 10,
      "brand_id": 45,
      "description": "Sugar glazed donut",
      "created_by": 1,
      "images": [
        {
          "image_id": 70,
          "image_name": "donut.jpg",
          "image_url": "https://www.cakeshop.com/images/donut.png"
        }
      ],
      "attributes": [
        { "attr_name": "flavor", "attr_values": ["Sugar"] }
      ]
    },
    {
      "item_id": 71,
      "item_code": "PC20260001",
      "item_name": "Bath Soap",
      "unit_price": "0.80",
      "discount": "0.05",
      "category_id": 11,
      "brand_id": 46,
      "description": "Moisturizing bath soap",
      "created_by": 1,
      "images": [
        {
          "image_id": 71,
          "image_name": "soap.jpg",
          "image_url": "https://www.dove.com/images/soap.png"
        }
      ],
      "attributes": [
        { "attr_name": "type", "attr_values": ["Bar"] }
      ]
    },

    {
      "item_id": 72,
      "item_code": "PC20260002",
      "item_name": "Shampoo",
      "unit_price": "2.50",
      "discount": "0.10",
      "category_id": 11,
      "brand_id": 47,
      "description": "Hair care shampoo",
      "created_by": 1,
      "images": [
        {
          "image_id": 72,
          "image_name": "shampoo.jpg",
          "image_url": "https://www.sunsilk.com/images/shampoo.png"
        }
      ],
      "attributes": [
        { "attr_name": "volume", "attr_values": ["400ml"] }
      ]
    },

    {
      "item_id": 73,
      "item_code": "PC20260003",
      "item_name": "Conditioner",
      "unit_price": "2.40",
      "discount": "0.10",
      "category_id": 11,
      "brand_id": 47,
      "description": "Hair conditioner",
      "created_by": 1,
      "images": [
        {
          "image_id": 73,
          "image_name": "conditioner.jpg",
          "image_url": "https://www.sunsilk.com/images/conditioner.png"
        }
      ],
      "attributes": [
        { "attr_name": "volume", "attr_values": ["400ml"] }
      ]
    },

    {
      "item_id": 74,
      "item_code": "PC20260004",
      "item_name": "Toothpaste",
      "unit_price": "1.50",
      "discount": "0.05",
      "category_id": 11,
      "brand_id": 48,
      "description": "Mint toothpaste",
      "created_by": 1,
      "images": [
        {
          "image_id": 74,
          "image_name": "toothpaste.jpg",
          "image_url": "https://www.colgate.com/images/toothpaste.png"
        }
      ],
      "attributes": [
        { "attr_name": "flavor", "attr_values": ["Mint"] }
      ]
    },

    {
      "item_id": 75,
      "item_code": "PC20260005",
      "item_name": "Toothbrush",
      "unit_price": "0.90",
      "discount": "0.00",
      "category_id": 11,
      "brand_id": 48,
      "description": "Soft bristle toothbrush",
      "created_by": 1,
      "images": [
        {
          "image_id": 75,
          "image_name": "toothbrush.jpg",
          "image_url": "https://www.colgate.com/images/toothbrush.png"
        }
      ],
      "attributes": [
        { "attr_name": "type", "attr_values": ["Soft"] }
      ]
    },
    {
      "item_id": 76,
      "item_code": "HH20260001",
      "item_name": "Laundry Detergent",
      "unit_price": "3.20",
      "discount": "0.15",
      "category_id": 12,
      "brand_id": 49,
      "description": "Laundry cleaning detergent",
      "created_by": 1,
      "images": [
        {
          "image_id": 76,
          "image_name": "detergent.jpg",
          "image_url": "https://www.ariel.com/images/detergent.png"
        }
      ],
      "attributes": [
        { "attr_name": "weight", "attr_values": ["1kg"] }
      ]
    },

    {
      "item_id": 77,
      "item_code": "HH20260002",
      "item_name": "Dishwashing Liquid",
      "unit_price": "1.80",
      "discount": "0.10",
      "category_id": 12,
      "brand_id": 50,
      "description": "Dish cleaning liquid",
      "created_by": 1,
      "images": [
        {
          "image_id": 77,
          "image_name": "dishwashing.jpg",
          "image_url": "https://www.sunlight.com/images/dishwashing.png"
        }
      ],
      "attributes": [
        { "attr_name": "volume", "attr_values": ["750ml"] }
      ]
    },

    {
      "item_id": 78,
      "item_code": "HH20260003",
      "item_name": "Floor Cleaner",
      "unit_price": "2.20",
      "discount": "0.10",
      "category_id": 12,
      "brand_id": 51,
      "description": "Multi-purpose floor cleaner",
      "created_by": 1,
      "images": [
        {
          "image_id": 78,
          "image_name": "floor-cleaner.jpg",
          "image_url": "https://www.lysol.com/images/floor.png"
        }
      ],
      "attributes": [
        { "attr_name": "volume", "attr_values": ["1L"] }
      ]
    },

    {
      "item_id": 79,
      "item_code": "HH20260004",
      "item_name": "Trash Bags",
      "unit_price": "1.50",
      "discount": "0.05",
      "category_id": 12,
      "brand_id": 52,
      "description": "Strong trash bags",
      "created_by": 1,
      "images": [
        {
          "image_id": 79,
          "image_name": "trash-bags.jpg",
          "image_url": "https://m.media-amazon.com/images/I/81Vn5IFvRSL.jpg"
        }
      ],
      "attributes": [
        { "attr_name": "size", "attr_values": ["Large"] }
      ]
    },

    {
      "item_id": 80,
      "item_code": "HH20260005",
      "item_name": "Tissue Paper",
      "unit_price": "1.20",
      "discount": "0.05",
      "category_id": 12,
      "brand_id": 53,
      "description": "Soft tissue paper",
      "created_by": 1,
      "images": [
        {
          "image_id": 80,
          "image_name": "tissue.jpg",
          "image_url": "https://th.bing.com/th/id/OIP.nqlxRB2UTq5cYX3geLkLwQHaHa?w=196&h=197&c=7&r=0&o=7&pid=1.7&rm=3https://www.kleenex.com/images/tissue.png"
        }
      ],
      "attributes": [
        { "attr_name": "pack", "attr_values": ["1 pack"] }
      ]
    }


  ]
};
export default items;
