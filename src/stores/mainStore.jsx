import { makeAutoObservable } from "mobx";

export default class mainStore {
    constructor() {
        this._products = []
        this._filteredProducts = []
        this._page = 1
        this._totalCount = 0
        this._totalPages = []
        this._limit = 5
        this._lastIndex = this._limit * this._page
        this._firstIndex = this._lastIndex - this._limit
        this._search = ''

        this._nameSort = 0
        this._viewSort = 0
        this._startSort = 0
        this._endSort = 0

        makeAutoObservable(this)
    }

    setNameSort (num) {
        this._nameSort = num
    }
    get nameSort () {
        return this._nameSort
    }

    setViewSort (num) {
        this._viewSort = num
    }
    get viewSort () {
        return this._viewSort
    }

    setStartSort (num) {
        this._startSort = num
    }
    get startSort () {
        return this._startSort
    }

    setEndSort (num) {
        this._endSort = num
    }
    get endSort () {
        return this._endSort
    }

    setZeroCount () {
        this._page = 1
        this._totalPages = 1
    }
    setTotalCount (count) {
        this._totalCount = count
        this._totalPages = Math.ceil(count / this._limit)
        if (this._page > this._totalPages) {
            this.setPage(1)
        } 
    }


    setPage (page) {
        this._page = +page
        this._lastIndex = this._limit * this._page
        this._firstIndex = this._lastIndex - this._limit
        localStorage.setItem('curPage', page)
    }

    setFilteredProducts (products) {
        this._filteredProducts = products
        // console.log(this._filteredProducts)
    }

    setProducts (products) {
        this._products = products
        this.setTotalCount(this._products.length)
        this._totalPages = Math.ceil(this._products.length / this._limit)
    }

    setSearch (search) {
        this._search = search
    }

    setLimit (limit) {
        this._limit = limit

        this._totalPages = Math.ceil(this._products.length / this._limit)
    }

    get search () {
        return this._search
    }
    
    get page () {
        return this._page
    }

    get filteredProducts () {
        return this._filteredProducts
    }

    get products () {
        return this._products
    }

    get totalPages () {
        return this._totalPages
    }

    get firstIndex () {
        return this._firstIndex
    }

    get lastIndex () {
        return this._lastIndex
    }

    get limit () {
        return this._limit
    }

    nextPage() {

        if (this._page < this._totalPages){
            this.setPage(this._page += 1)
        }
    }

    prevPage() {
        if (this._page > 1) {
            this.setPage(this._page -= 1)
        }
    }
}