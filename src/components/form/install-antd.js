/**
 * 按需加载antd
 */
import {
    ConfigProvider,
    Layout,
    Input,
    InputNumber,
    Button,
    Switch,
    Radio,
    Checkbox,
    Select,
    Card,
    Form,
    Row,
    Col,
    Modal,
    Table,
    Tabs,
    Badge,
    Popover,
    Dropdown,
    List,
    Avatar,
    Breadcrumb,
    Steps,
    Spin,
    Menu,
    Drawer,
    Tooltip,
    Alert,
    Tag,
    Divider,
    DatePicker,
    TimePicker,
    Upload,
    Progress,
    Skeleton,
    Popconfirm,
    PageHeader,
    Result,
    Statistic,
    Descriptions,
    message,
    notification,
    Empty,
    Tree,
    TreeSelect,
    Cascader,
    Carousel
} from 'ant-design-vue'
const useComponents = [
    ConfigProvider,
    Layout,
    Input,
    InputNumber,
    Button,
    Switch,
    Radio,
    Checkbox,
    Select,
    Card,
    Form,
    Row,
    Col,
    Modal,
    Table,
    Tabs,
    Badge,
    Popover,
    Dropdown,
    List,
    Avatar,
    Breadcrumb,
    Steps,
    Spin,
    Menu,
    Drawer,
    Tooltip,
    Alert,
    Tag,
    Divider,
    DatePicker,
    TimePicker,
    Upload,
    Progress,
    Skeleton,
    Popconfirm,
    PageHeader,
    Result,
    Descriptions,
    Statistic,
    Empty,
    Tree,
    TreeSelect,
    Modal,
    Cascader,
    Carousel
]
const useConfig = [{
        $confirm: Modal.confirm
    },
    {
        $message: message
    },
    {
        $notification: notification
    },
    {
        $info: Modal.info
    },
    {
        $success: Modal.success
    },
    {
        $error: Modal.error
    },
    {
        $warning: Modal.warning
    }
]
export const installAntd = (Vue) => {
    for (const component of useComponents) {
        Vue.use(component);
    }
    //全局配置
    for (const config of useConfig) {
        Vue.config.globalProperties = {
            ...Vue.config.globalProperties,
            ...config
        }
    }
}