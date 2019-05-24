<template>
    <div class="main content amount-flow">
        <el-form :inline="true" :model="searchParams" class="search-form-inline" size="small">
            <el-row :gutter="12">
                <el-col :span="4">
                    <el-form-item label="类目">
                        <el-input v-model="searchParams.dishType"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="名称">
                        <el-input v-model="searchParams.dishName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item>
                        <el-button type="primary" @click="handleSearch">查询</el-button>
                        <el-button
                                type="primary"
                                size="small"
                                @click="dishAdd()">新增</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-table
                :data="tableData"
                :height="tableHeight"
                v-loading="loading"
                border
                style="width: 100%; margin-top: 1px">
            <el-table-column
                    prop="merchantId"
                    label="商户ID"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="dishName"
                    label="菜肴名称"
                    width="200">
            </el-table-column>
            <el-table-column
                    label="所属类目"
                    prop="dishType"
                    width="200">
            </el-table-column>
            <el-table-column
                    label="口味标记"
                    prop="dishTag"
                    width="">
            </el-table-column>
            <el-table-column
                    label="菜肴配料"
                    prop="ingredients"
                    width="">
            </el-table-column>
            <el-table-column
                    label="预览图片"
                    prop="preview"
                    width="">
            </el-table-column>
            <el-table-column
                    label="价格"
                    prop="price"
                    width="">
            </el-table-column>
            <el-table-column
                    label="简介"
                    prop="intro"
                    width="">
            </el-table-column>
            <el-table-column
                    label="操作"
                    width="250">
                <template slot-scope="scope">
                    <el-button
                            type="primary"
                            size="small"
                            @click="dishUpdate(scope.row)">编辑</el-button>
                    <el-button
                            type="primary"
                            size="small"
                            @click="dishDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                style="margin-top: 25px"
                background
                @current-change="handleCurrentChange"
                :current-page.sync="searchParams.page"
                :page-size="15"
                layout="total, prev, pager, next, jumper"
                :total="TotalPage">
        </el-pagination>
        <el-dialog :title="title" :visible.sync="dialogFormVisible">
            <el-form :model="form" ref="form" :rules="rules" label-width="80px">
                <el-form-item label="打手昵称" prop="hatchet_man_name">
                    <el-input v-model="form.hatchet_man_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="打手电话" prop="hatchet_man_phone">
                    <el-input v-model.number="form.hatchet_man_phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="打手QQ" prop="hatchet_man_qq">
                    <el-input v-model.number="form.hatchet_man_qq" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="content">
                    <el-input type="textarea" v-model="form.content" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button v-if="isAdd" type="primary" @click="submitFormAdd('form')">确认</el-button>
                    <el-button v-if="isUpdate" type="primary" @click="submitFormUpdate('form')">确认修改</el-button>
                    <el-button @click="dishCancel('form')">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        methods: {
            //新增按钮
            dishAdd(){
                this.isAdd=true;
                this.isUpdate=false;
                this.title='打手黑名单新增';
                this.dialogFormVisible = true;
                this.form={
                    hatchet_man_name: '',
                    hatchet_man_phone: '',
                    hatchet_man_qq: '',
                    content: ''
                };
            },
            // 编辑按钮
            dishUpdate(row) {
                this.isAdd=false;
                this.isUpdate=true;
                this.title='打手黑名单修改';
                this.dialogFormVisible = true;
                this.form=JSON.parse(JSON.stringify(row));
            },
            // 取消按钮
            dishListCancel(formName) {
                this.dialogFormVisible = false;
                this.$refs[formName].clearValidate();
            },
            // 添加
            submitFormAdd(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$api.AccountBlackListAdd(this.form).then(res => {
                            this.$message({
                                showClose: true,
                                type: res.status == 1 ? 'success' : 'error',
                                message: res.message
                            });
                            this.handleTableData();
                        }).catch(err => {
                            this.$message({
                                type: 'error',
                                message: '操作失败'
                            });
                        });
                    } else {
                        return false;
                    }
                    this.$refs[formName].clearValidate();
                });
            },
            // 修改
            submitFormUpdate(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$api.AccountBlackListUpdate(this.form).then(res => {
                            this.$message({
                                showClose: true,
                                type: res.status == 1 ? 'success' : 'error',
                                message: res.message
                            });
                            this.handleTableData();
                        }).catch(err => {
                            this.$message({
                                type: 'error',
                                message: '操作失败'
                            });
                        });
                    } else {
                        return false;
                    }
                });
            },
            // 加载数据
            handleTableData(){
                this.$api.dishList(this.searchParams).then(res => {
                    if (res.data.pagerList) {
                        this.tableData = res.data.pagerList;
                        this.TotalPage = res.data.pagerList.total;
                    } else {
                        this.$alert('暂无相关数据，请点击新增按钮增加菜肴!', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                            }
                        });
                    }

                    this.loading=false;
                }).catch(err => {
                    this.$alert('获取数据失败, 请重试!', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                        }
                    });
                });
            },
            handleName(){
                // this.$api.AccountBlackListName(this.searchParams).then(res => {
                //     this.AccountBlackListName = res;
                // }).catch(err => {
                //     this.$alert('获取数据失败, 请重试!', '提示', {
                //         confirmButtonText: '确定',
                //         callback: action => {
                //         }
                //     });
                // });
            },
            handleSearch() {
                this.handleTableData();
            },
            handleCurrentChange(page) {
                this.searchParams.page = page;
                this.handleTableData();
            },
            // 删除
            dishDelete (id) {
                this.$confirm('您确定要删除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$api.AccountBlackListDelete({id:id}).then(res => {
                        this.$message({
                            showClose: true,
                            type: res.status == 1 ? 'success' : 'error',
                            message: res.message
                        });
                        this.handleTableData();
                    }).catch(err => {
                        this.$message({
                            type: 'error',
                            message: '操作失败'
                        });
                    });
                });
            },
            // 表格高度计算
            handleTableHeight() {
                this.tableHeight = window.innerHeight - 318;
            },
        },
        created(){
            this.handleTableData();
            this.handleName();
            this.handleTableHeight();
            window.addEventListener('resize', this.handleTableHeight);
        },
        destroyed() {
            window.removeEventListener('resize', this.handleTableHeight);
        },
        data(){
            return {
                loading:true,
                tableHeight: 0,
                isAdd:true,
                isUpdate:false,
                title:'新增',
                url:'',
                dialogFormVisible:false,
                AccountBlackListName:{},
                searchParams:{
                    dishType:'',
                    dishName:'',
                    page:1
                },
                TotalPage:0,
                tableData: [],
                rules:{
                    storeyNo:[{ required: true, message:'必填项不可为空!', trigger: 'blur' }],
                    tableNo:[{ required: true, message:'必填项不可为空!', trigger: 'blur' }],
                },
                form: {
                    storeyNo: '',
                    tableNo: '',
                    merchantId: '',
                    tableName: '',
                    capacity: '',
                    position: '',
                    minPrice: ''
                }
            }
        }
    }
</script>
