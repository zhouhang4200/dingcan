<template>
    <div class="main content amount-flow">
        <el-form :inline="true" :model="searchParams" class="search-form-inline" size="small">
            <el-row :gutter="12">
                <el-col :span="4">
                    <el-form-item label="类目">
                        <el-input v-model="searchParams.dishType" id="dishType"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="名称">
                        <el-input v-model="searchParams.dishName" id="dishName"></el-input>
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
                <el-form-item v-show="false" label="商户id" prop="dishName">
                    <el-input v-model="form.merchantId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="菜肴名称" prop="dishName">
                    <el-input v-model="form.dishName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="所属类目" prop="dishType">
                    <el-input v-model.number="form.dishType" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="口味标记" prop="dishTag">
                    <el-input v-model.number="form.dishTag" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="菜肴配料" prop="ingredients">
                    <el-input v-model.number="form.ingredients" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="预览图片" prop="preview">
                    <!--<el-upload-->
                            <!--class="avatar-uploader"-->
                            <!--action="/v2/account/authentication-upload?name=preview"-->
                            <!--:show-file-list="false"-->
                            <!--accept="image/jpeg,image/jpg,image/png"-->
                            <!--:on-success="handleAvatarSuccess"-->
                            <!--:before-upload="beforeAvatarUpload">-->
                        <!--<img v-if="imageUrl1" :src="imageUrl1" class="avatar">-->
                        <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                    <!--</el-upload>-->
                    <el-input v-model="form.preview" autocomplete="off" type="hidden"></el-input>
                </el-form-item>
                <el-form-item label="价格" prop="price">
                    <el-input v-model.number="form.price" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="简介" prop="intro">
                    <el-input v-model.number="form.intro" autocomplete="off"></el-input>
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
                this.title='添加菜肴';
                this.dialogFormVisible = true;
                this.form={
                    merchantId: '',
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
            dishCancel(formName) {
                this.dialogFormVisible = false;
                this.$refs[formName].clearValidate();
            },
            // 添加
            submitFormAdd(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$api.dishAdd(this.form).then(res => {
                            this.$message({
                                showClose: true,
                                type: res.messageType == 'SUCCESS' ? 'success' : 'error',
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
                        this.$api.dishUpdate(this.form).then(res => {
                            this.$message({
                                showClose: true,
                                type: res.messageType == 'SUCCESS' ? 'success' : 'error',
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
                    this.tableData = res.data.pagerList;
                    this.TotalPage = res.data.total;
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
                var dishName = document.getElementById('dishName').value;
                var dishType = document.getElementById('dishType').value;
                if (dishName) {
                    this.searchParams['dishName'] = dishName;
                } else {
                    delete this.searchParams.dishName;
                }

                if (dishType) {
                    this.searchParams['dishType'] = dishType;
                } else {
                    delete this.searchParams.dishType;
                }

                console.log(this.searchParams);
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
                    this.$api.dishDelete({id:id}).then(res => {
                        this.$message({
                            showClose: true,
                            type: res.messageType == 'SUCCESS' ? 'success' : 'error',
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
